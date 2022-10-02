import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import client from '../../contentful/index';
import { IArticle, IArticleFields } from '../../contentful';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Container, Button } from 'reactstrap';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Article({ article }: { article: IArticle }) {

  return (
    <>
      <Head>
        <title>{article.fields.title}</title>
      </Head>
      <Container>
        <h1 style={{ padding: '3px 0 3px 0' }}>{article.fields.title}</h1>
        <div style={{ paddingBottom: '2px 0 2px 0' }}>
          {documentToReactComponents(article.fields.content!)}
        </div>
        <Link href="/">
          <a>
            <Button>{'Back to articles'}</Button>
          </a>
        </Link>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articleEntries = await client.getEntries<IArticleFields>({
    content_type: 'article',
    // select: 'fields.title,fields.slug.fields.description',
  });

  return {
    paths: articleEntries.items.map(item => {
      return {
        params: {
          article: item.fields.slug,
        },
      };
    }),

    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.article!;

  const articleEntries = await client.getEntries<IArticleFields>({
    content_type: 'article',
    limit: 1,
    'fields.slug': slug,
  });

  const [article] = articleEntries.items;

  return {
    props: {
      article,
    },
  };
};
