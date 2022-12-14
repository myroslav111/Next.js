// import type { NextPage } from 'next';
import { GetStaticProps, GetServerSideProps } from 'next';
import Head from 'next/head';
import { IArticle, IArticleFields, IHome, IHomeFields } from '../contentful';
import Link from 'next/link';
// import Image from 'next/image';
import client from '../contentful/index';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Button,
} from 'reactstrap';

// import styles from '../styles/Home.module.css';

const Home = ({ home, articles }: { home: IHome; articles: IArticle[] }) => {
  return (
    <div>
      <Head>
        <title>{home.fields.title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div
          style={{
            background: `url("http:${home.fields.background?.fields.file.url}") no-repeat center / cover`,
            minHeight: 300,
            textAlign: 'center',
            padding: 5,
            color: 'white',
          }}
        >
          <h1 style={{ marginTop: 5 }}>{home.fields.title}</h1>

          <div style={{ marginBottom: 5 }}>
            {documentToReactComponents(home.fields.description!)}
          </div>
        </div>
        <Container style={{ paddingTop: 5 }}>
          <Row>
            {articles.map(article => {
              return (
                <Col sm={4} key={article.fields.slug}>
                  <Card body>
                    <CardTitle tag="h5">{article.fields.title}</CardTitle>
                    <CardText>{article.fields.description}</CardText>
                    <Link href={`/articles/${article.fields.slug}`}>
                      <a>
                        <Button>{article.fields.action}</Button>
                      </a>
                    </Link>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Home;

/**
 *
 * rendering static html this function (The page is being generated at the building stage, and then it doesn't change.)
 */
export const getStaticProps: GetStaticProps = async () => {
  const home = await client.getEntries<IHomeFields>({
    content_type: 'home',
    limit: 1,
  });

  const articleEntries = await client.getEntries<IArticleFields>({
    content_type: 'article',
    // select: 'fields.title,fields.slug.fields.description',
  });

  const [homePage] = home.items;

  return {
    props: {
      title: 'My Blog',
      home: homePage,
      articles: articleEntries.items,
    },
    revalidate: 3600,
  };
};

/**
 *
 *render page on each require
 */
// export const getServerSideProps: GetServerSideProps = async () => {
//   return {
//     props: {
//       title: 'My Blog',
//     },
//   };
// };
