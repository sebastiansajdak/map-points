import * as React from 'react';
import * as styles from './Map.scss';
import mapSettings from './mapSettings';
import ReactDOMServer from 'react-dom/server';
import Tooltip from './component/Tooltip';
import useScript from '../../customHooks/useScript';
import { getDataForTooltip, getIconForMarker } from 'helpers/common';
import {
    API_GOOGLE_URL,
    CLUSTER_IMAGE_PATH,
} from 'constants/common';

const Map = ({
    markersData
}: any) => {
    const mapItem = React.useRef(null);
    const [apiGoogleLoaded] = useScript(API_GOOGLE_URL);
    const [map, setMap] = React.useState<any>(null);
    const [markerInfo, setMarkerInfo] = React.useState<any>(null);
    const [markerCluster, setMarkerCluster] = React.useState<any>(null);

    React.useEffect(() => {
        if (apiGoogleLoaded) {
            const map = new google.maps.Map(mapItem.current, mapSettings);

            setMap(map);
            setMarkerInfo(new google.maps.InfoWindow());
        }
    }, [apiGoogleLoaded]);

    React.useEffect(() => {
        if (apiGoogleLoaded && map) {
            if (markerCluster) markerCluster.clearMarkers();

            setMarkets();
        }

        return () => {
            if (apiGoogleLoaded && map) google.maps.event.clearListeners(map, 'click');
        }
    }, [apiGoogleLoaded, markersData, map]);

    const setMarkets = () => {
        const newMarkers = markersData.map((point: any) => {
            const marker = new window.google.maps.Marker({
                map,
                icon: getIconForMarker(point),
                position: {
                    lat: point.location.lat,
                    lng: point.location.lng
                },
            });

            google.maps.event.addListener(marker, 'click', () => {
                markerInfo.setContent(ReactDOMServer.renderToString(
                    <Tooltip data={getDataForTooltip(point)} />
                ));
                markerInfo.open(map, marker);
            });

            return marker;
        });

        if (newMarkers.length) {
            setMarkerCluster(
                new MarkerClusterer(
                    map,
                    newMarkers,
                    { imagePath: CLUSTER_IMAGE_PATH }
                )
            );
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.map} ref={mapItem}></div>

            <style jsx global>{`
                .gm-style .gm-style-iw-c {
                    border-radius: 0;
                    padding: 0;
                    background: none;
                    box-shadow: none;
                }

                .gm-style .gm-style-iw-c button {
                    background: #fff !important;
                    border-radius: 15px !important;
                }

                .gm-style .gm-style-iw-d {
                    overflow: hidden !important;
                }

                .gm-style .gm-style-iw-t::after {
                    display: none;
                }
            `}</style>
        </div>
    )
}

export default React.memo(Map);
