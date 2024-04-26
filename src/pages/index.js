import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.noUserSelect)}>
        <Heading as="h1" className="hero__title">
          知产智库 | {siteConfig.title}
        </Heading>
        <div className={clsx('hero__subtitle', styles.subtitleFlexing)}>
          <span>Intellectual Property</span>
          <span>Knowledge Base</span>
        </div>
        <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs">
              浏览法条 📚
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/search">
              全站检索 🔍
            </Link>
          
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`知产智库`}
      description="Intellectual Property Knowledge Base, 知产智库">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
