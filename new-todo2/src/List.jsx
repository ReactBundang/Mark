import React from 'react'
import * as firebase from 'firebase'
import { useList, useObject, useListVals } from 'react-firebase-hooks/database';

export const List = ({todos}) => {
    const db= firebase.database();
    const [snapshots, loading, error] = useList(db.ref('todos'));
    //const [value, loading, error] = useObject(firebase.database().ref('todos/1'));
    //const [value, loading, error] = useListVals<Todo>('todos');

    const todoList= todos.map(todo => <li>{todo}</li>)
    return (
        <>
        <div>
                <p>
                    {error && <strong>Error: {error}</strong>}
                    {loading && <span>Value: Loading...</span>}
                </p>
        </div>
        <ul>
            {!loading && snapshots && (
            <React.Fragment>
                <span>
                {snapshots.map((v) => (
                    <li>{v.val()}</li>
                ))}
                </span>
            </React.Fragment>
            )}
            {todoList}
        </ul>
        </>
    )
}
export default List;
