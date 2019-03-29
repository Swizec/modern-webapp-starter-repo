import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GroceryList from "../components/GroceryList"

const IndexPage = () => (
  <Layout>
    <SEO title="🛍" keywords={[`gatsby`, `application`, `react`]} />{" "}
    <GroceryList
      listId="workshopList"
      initialState={{
        listName: "Workshop Party",
        groceries: [],
      }}
    />{" "}
  </Layout>
)

export default IndexPage
