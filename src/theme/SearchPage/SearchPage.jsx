import React, { useCallback, useEffect, useMemo, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { usePluralForm } from "@docusaurus/theme-common";
import clsx from "clsx";

// import useSearchQuery from "../hooks/useSearchQuery";
// import { fetchIndexes } from "../SearchBar/fetchIndexes";
// import { SearchSourceFactory } from "../../utils/SearchSourceFactory";
// import { highlight } from "../../utils/highlight";
// import { highlightStemmed } from "../../utils/highlightStemmed";
// import { getStemmedPositions } from "../../utils/getStemmedPositions";
// import LoadingRing from "../LoadingRing/LoadingRing";
// import { concatDocumentPath } from "../../utils/concatDocumentPath";
// import { Mark, searchContextByPaths, useAllContextsWithNoSearchContext, } from "../../utils/proxiedGenerated";
// import { normalizeContextByPath } from "../../utils/normalizeContextByPath";
import useSearchQuery from "@easyops-cn/docusaurus-search-local/dist/client/client/theme/hooks/useSearchQuery"
import { fetchIndexes } from "@easyops-cn/docusaurus-search-local/dist/client/client/theme/SearchBar/fetchIndexes";
import { SearchSourceFactory } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/SearchSourceFactory";
import { highlight } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlight";
import { highlightStemmed } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlightStemmed";
import { getStemmedPositions } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/getStemmedPositions";
import LoadingRing from "@easyops-cn/docusaurus-search-local/dist/client/client/theme/LoadingRing/LoadingRing";
import { concatDocumentPath } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/concatDocumentPath";
import { Mark, searchContextByPaths, useAllContextsWithNoSearchContext, } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/proxiedGenerated";
import { normalizeContextByPath } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/normalizeContextByPath";

import styles from "./SearchPage.module.css";

export default function SearchPage() {
    return (<Layout>
      <SearchPageContent />
    </Layout>);
}
function SearchPageContent() {
    const { siteConfig: { baseUrl }, i18n: { currentLocale }, } = useDocusaurusContext();
    const { selectMessage } = usePluralForm();
    const { searchValue, searchContext, searchVersion, updateSearchPath, updateSearchContext, } = useSearchQuery();
    const [searchQuery, setSearchQuery] = useState(searchValue);
    const [searchSource, setSearchSource] = useState();
    const [searchResults, setSearchResults] = useState();
    const versionUrl = `${baseUrl}${searchVersion}`;
    const pageTitle = useMemo(() => searchQuery
        ? translate({
            id: "theme.SearchPage.existingResultsTitle",
            message: 'Search results for "{query}"',
            description: "The search page title for non-empty query",
        }, {
            query: searchQuery,
        })
        : translate({
            id: "theme.SearchPage.emptyResultsTitle",
            message: "Search the documentation",
            description: "The search page title for empty query",
        }), [searchQuery]);
    useEffect(() => {
        updateSearchPath(searchQuery);
        if (searchSource) {
            if (searchQuery) {
                searchSource(searchQuery, (results) => {
                    setSearchResults(results);
                });
            }
            else {
                setSearchResults(undefined);
            }
        }
        // `updateSearchPath` should not be in the deps,
        // otherwise will cause call stack overflow.
    }, [searchQuery, searchSource]);
    const handleSearchInputChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);
    useEffect(() => {
        if (searchValue && searchValue !== searchQuery) {
            setSearchQuery(searchValue);
        }
    }, [searchValue]);
    useEffect(() => {
        async function doFetchIndexes() {
            const { wrappedIndexes, zhDictionary } = !Array.isArray(searchContextByPaths) || searchContext || useAllContextsWithNoSearchContext
                ? await fetchIndexes(versionUrl, searchContext)
                : { wrappedIndexes: [], zhDictionary: [] };
            setSearchSource(() => SearchSourceFactory(wrappedIndexes, zhDictionary, 100));
        }
        doFetchIndexes();
    }, [searchContext, versionUrl]);
    return (<React.Fragment>
      <Head>
        {/*
         We should not index search pages
          See https://github.com/facebook/docusaurus/pull/3233
        */}
        <meta property="robots" content="noindex, follow"/>
        <title>{pageTitle}</title>
      </Head>

      <div className="container margin-vert--lg">
        <h1>{pageTitle}</h1>

        <div className="row">
          <div className={clsx("col", {
            [styles.searchQueryColumn]: Array.isArray(searchContextByPaths),
            "col--9": Array.isArray(searchContextByPaths),
            "col--12": !Array.isArray(searchContextByPaths),
        })}>
            <input type="search" name="q" className={styles.searchQueryInput} aria-label="Search" onChange={handleSearchInputChange} value={searchQuery} autoComplete="off" autoFocus/>
          </div>
          {Array.isArray(searchContextByPaths) ? (<div className={clsx("col", "col--3", "padding-left--none", styles.searchContextColumn)}>
              <select name="search-context" className={styles.searchContextInput} id="context-selector" value={searchContext} onChange={(e) => updateSearchContext(e.target.value)}>
                {useAllContextsWithNoSearchContext && (<option value="">
                    {translate({
                    id: "theme.SearchPage.searchContext.everywhere",
                    message: "everywhere",
                })}
                  </option>)}
                {searchContextByPaths.map((context) => {
                const { label, path } = normalizeContextByPath(context, currentLocale);
                return (<option key={path} value={path}>
                      {label}
                    </option>);
            })}
              </select>
            </div>) : null}
        </div>

        {!searchSource && searchQuery && (<div>
            <LoadingRing />
          </div>)}

        {searchResults &&
            (searchResults.length > 0 ? (<p>
              {selectMessage(searchResults.length, translate({
                    id: "theme.SearchPage.documentsFound.plurals",
                    message: "1 document found|{count} documents found",
                    description: 'Pluralized label for "{count} documents found". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
                }, { count: searchResults.length }))}
            </p>) : process.env.NODE_ENV === "production" ? (<p>
              {translate({
                    id: "theme.SearchPage.noResultsText",
                    message: "No documents were found",
                    description: "The paragraph for empty search result",
                })}
            </p>) : (<p>
              ⚠️ The search index is only available when you run docusaurus
              build!
            </p>))}

        <section>
          {searchResults &&
            searchResults.map((item) => (<SearchResultItem key={item.document.i} searchResult={item}/>))}
        </section>
      </div>
    </React.Fragment>);
}
function SearchResultItem({ searchResult: { document, type, page, tokens, metadata }, }) {
    const isTitle = type === 0;
    const isContent = type === 2;
    const pathItems = (isTitle ? document.b : page.b).slice();
    const articleTitle = (isContent ? document.s : document.t);
    if (!isTitle) {
        pathItems.push(page.t);
    }
    let search = "";
    if (Mark && tokens.length > 0) {
        const params = new URLSearchParams();
        for (const token of tokens) {
            params.append("_highlight", token);
        }
        search = `?${params.toString()}`;
    }
    console.log(document);
    console.log(search);
    console.log(type);
    console.log("******************\n\n")
    return (<article className={styles.searchResultItem}>
      <h3>
        <Link to={document.u + search + (document.h || "")} dangerouslySetInnerHTML={{
            __html: isContent
                ? highlight(articleTitle, tokens)
                : highlightStemmed(articleTitle, getStemmedPositions(metadata, "t"), tokens, 180),
        }}></Link>
      </h3>
      {pathItems.length > 0 && (<p className={styles.searchResultItemPath}>
          {concatDocumentPath(pathItems)}
        </p>)}
      {isContent && (<p className={styles.searchResultItemSummary} dangerouslySetInnerHTML={{
                __html: highlightStemmed(document.t, getStemmedPositions(metadata, "t"), tokens, 180),
            }}/>)}
    </article>);
}
