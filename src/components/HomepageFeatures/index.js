import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '面向知识产权',
    Svg: require('@site/static/img/homepage-law-light.svg').default,
    description: (
      <>
        所收录内容均为知识产权领域涉及的法律文本，为知识产权从业人员打造。
      </>
    ),
  },
  {
    title: '快速检索 & 引用定位',
    Svg: require('@site/static/img/homepage-search-light.svg').default,
    description: (
      <>
        所有页面均可使用 <kbd>CTRL | ⌘</kbd> + <kbd>K</kbd> 激活搜索功能，快速定位至任意收录法条。
        外部链接引用均可精确定位至具体法条，站点于全球边缘计算节点部署，为邮件交流节省篇幅。
      </>
    ),
  },
  {
    title: '离线也可大放光彩',
    Svg: require('@site/static/img/homepage-offline-light.svg').default,
    description: (
      <>
        所有功能在离线PWA模式下均不需要互联网连接，一次下载即可在离线模式下使用所有功能。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={clsx("homepage-row row")}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
