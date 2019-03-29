import React, { useState, useReducer } from "react"
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

// use onClick to dispatch a toggle done action
const ListItem = ({ itemName, done, dispatch, index }) => (
  <Item justifyContent="space-between">
    <ItemName as="span" onClick={() => dispatch({ type: "toggleDone", index })}>
      {done ? <Strike>{itemName}</Strike> : itemName}
    </ItemName>
    <Button opaque={false} onClick={() => dispatch({ type: "remove", index })}>
      ❌
    </Button>
  </Item>
)

const NewItem = ({ dispatch }) => {
  // useState to keep state of the new item input
  const [itemName, setItem] = useState("")

  const changeHandler = event => setItem(event.target.value)

  const addItem = () => {
    dispatch({ type: "addItem", itemName })
    setItem("")
  }

  return (
    <Flex>
      <Input
        value={itemName}
        onChange={changeHandler}
        onKeyPress={({ key }) => (key === "Enter" ? addItem() : null)}
        placeholder="What do you need to buy? 🛍"
      />
      <Button onClick={addItem}>Add</Button>
    </Flex>
  )
}

// add a toggleDone action that changes the done property on an item
// use index to identify which item you're changing
function reducer(state, action) {
  const index = action.index

  switch (action.type) {
    case "addItem":
      return [
        ...state,
        {
          itemName: action.itemName,
          key: new Date().toISOString(),
        },
      ]
    case "toggleDone":
      return [
        ...state.slice(0, index),
        { ...state[index], done: !state[index].done },
        ...state.slice(index + 1),
      ]
    case "remove":
      return [...state.slice(0, index), ...state.slice(index + 1)]
    default:
      throw Error("Unnknown action")
  }
}

const GroceryList = ({ listId, initialState }) => {
  const [listName, setListName] = useState(initialState.listName)
  const [groceries, dispatch] = useReducer(reducer, initialState.groceries)

  return (
    <Box>
      <TitleInput
        value={listName}
        onChange={event => setListName(event.target.value)}
        placeholder="Give your list a name"
      />
      {/* Render a Paragraph if groceries is empty */}
      {!groceries.length ? (
        <Paragraph>Add some items to your list 👇</Paragraph>
      ) : null}
      {/* Loop through groceries and render a ListItem component for each */}
      {/* ListItem should take props { itemName, done }; render itemName with Strike when th eitem is done */}
      {groceries.map((item, index) => (
        <ListItem {...item} index={index} key={item.key} dispatch={dispatch} />
      ))}
      <NewItem dispatch={dispatch} />
    </Box>
  )
}

export default GroceryList
