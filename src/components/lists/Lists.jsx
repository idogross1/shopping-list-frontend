export const Lists = (props) => {
    return <ul>
        {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
        {props.lists.data.length &&
            props.lists.data.map((list, index) => <li key={index}>{list.name}</li>)}
    </ul>
}