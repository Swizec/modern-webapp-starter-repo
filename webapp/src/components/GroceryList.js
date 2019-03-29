import React from "react"
import { Box, Paragraph, Heading, Input, Flex, Button, styled } from "reakit"
import { theme } from "styled-tools"
import posed, { PoseGroup } from "react-pose"

const TitleInput = styled(Input)`
  font-weight: bold;
  font-size: ${theme("fontSize.3")};
  margin-bottom: 0.5em;
`

const Item = styled(Flex)`
  padding: 0.5em 0em;
  padding-right: 1em;
`

const PosedItem = posed.div({
  before: { opacity: 0, paddingLeft: 0 },
  enter: { opacity: 1, paddingLeft: 50 },
  exit: { opacity: 0, paddingLeft: 500 },
})

const ItemName = styled(Heading)`
  cursor: pointer;
  display: inline-block;
  padding: 0.5em 0;
`

const Strike = styled.span`
  display: inline-block;
  text-decoration: line-through;
  position: relative;
  left: -19px;
  &:before,
  &:after {
    content: "\00a0\00a0\00a0\00a0";
  }
`

const ListItem = ({ itemName, done }) => (
  <Item justifyContent="space-between">
    <ItemName as="span">
      {done ? <Strike>{itemName}</Strike> : itemName}
    </ItemName>
  </Item>
)

const GroceryList = ({ listId }) => {
  const groceries = [
    { itemName: "beer", done: false, key: 1 },
    { itemName: "pizza", done: true, key: 2 },
  ]

  return (
    <Box>
      <TitleInput value="Workshop Party" placeholder="Give your list a name" />
      {/* Render a Paragraph if groceries is empty */}
      {!groceries.length ? (
        <Paragraph>Add some items to your list 👇</Paragraph>
      ) : null}
      {/* Loop through groceries and render a ListItem component for each */}
      {/* ListItem should take props { itemName, done }; render itemName with Strike when th eitem is done */}
      {groceries.map((item, index) => (
        <ListItem {...item} key={item.key} />
      ))}
    </Box>
  )
}

export default GroceryList
