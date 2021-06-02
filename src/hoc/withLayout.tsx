/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import Layout from 'components/Layout';

const withLayout = <P extends {}>(Component: React.ComponentType<P>) => (props: P): JSX.Element => (
  <Layout>
    <Component {...props} />
  </Layout>
);

export default withLayout;
