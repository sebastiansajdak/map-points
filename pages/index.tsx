import * as React from 'react';
import MainLayout from '../src/components/MainLayout';
import { debug, styletron } from '../styletron';
import { BaseProvider, LightTheme } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { withRedux } from '../src/redux/redux';
import './index.scss';
import Head from 'next/head'
import { API_GOOGLE_CLUSTER } from 'constants/common';

const Index = () =>
    <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
        <BaseProvider theme={LightTheme}>
            <>
                <Head>
                    <title>Map points</title>
                    <meta name='Description' content='Vehicles, Parkings, POI points'></meta>
                    <script src={API_GOOGLE_CLUSTER} />
                </Head>
                <MainLayout />
            </>
        </BaseProvider>
    </StyletronProvider>;

export default withRedux(Index);
