import { storiesOf } from "@storybook/react"
import { extend } from "lodash"
import React from "react"
import { Byline } from "../Byline/Byline"
import { NewsByline } from "../Byline/NewsByline"
import { Share } from "../Byline/Share"
import { ShareDate } from "../Byline/ShareDate"
import { NewsArticle, StandardArticle } from "../Fixtures/Articles"
import { EditableChild } from "../Fixtures/Helpers"

storiesOf("Publishing/Byline", module)
  .add("Share", () => {
    return (
      <div>
        <Share
          url="http://artsy.net/article/point-pencils"
          title="The Point of Pencils"
        />
      </div>
    )
  })
  .add("Share with custom tracking", () => {
    const data = { entity_id: "1234", entity_type: "feature" }
    return (
      <div>
        <Share
          url="http://artsy.net/article/point-pencils"
          title="The Point of Pencils"
          trackingData={data}
        />
      </div>
    )
  })
  .add("Share with label", () => {
    return (
      <div>
        <Share
          url="http://artsy.net/article/point-pencils"
          title="The Point of Pencils"
          hasLabel
        />
      </div>
    )
  })
  .add("Full Byline", () => {
    return (
      <div>
        <Byline article={StandardArticle} />
      </div>
    )
  })
  .add("Many Authors Byline", () => {
    const article = extend({}, StandardArticle, {
      authors: [
        { name: "Kana Abe" },
        { name: "Anna Louis-Sussman" },
        { name: "Halley Johnson" },
      ],
    })
    return (
      <div>
        <Byline article={article} />
      </div>
    )
  })
  .add("Condensed Byline", () => {
    return (
      <div>
        <Byline article={StandardArticle} layout="condensed" />
      </div>
    )
  })
  .add("Byline with custom color", () => {
    return (
      <div>
        <Byline article={StandardArticle} color="blue" />
      </div>
    )
  })
  .add("Share Date", () => {
    return (
      <div>
        <ShareDate article={StandardArticle} />
      </div>
    )
  })
  .add("News Byline", () => {
    return (
      <div>
        <NewsByline article={NewsArticle} />
      </div>
    )
  })
  .add("News Byline without source", () => {
    const article = Object.assign({}, NewsArticle)
    article.news_source = {}
    return (
      <div>
        <NewsByline article={article} />
      </div>
    )
  })
  .add("Editable DateSource from NewsByline", () => {
    const article = Object.assign({}, NewsArticle)
    return (
      <div>
        <NewsByline article={article} editSource={EditableChild("source")} />
      </div>
    )
  })
