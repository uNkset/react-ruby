import React, { useEffect, useState } from 'react';
import ButtonGroup from './ButtonGroup';

function Post(props: any) {
  const { post, postToEdit, submitEdit, dispatch, toggleEditForm } = props;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [isEditing, setIsEditing] = useState(postToEdit === post.id);

  useEffect(() => {
    setIsEditing(postToEdit === post.id);
  }, [postToEdit, post.id]);

  function submitHandler(e: any) {
    e.preventDefault();
    const formData = {
      post: {
        id: post.id,
        title: title,
        body: body,
      },
    };
    submitEdit(formData);
    resetState();
  }

  function resetState() {
    setTitle(post.title);
    setBody(post.body);
  }

  const titleElement = <h2 className="title text-start">{post.title}</h2>;
  const bodyElement = <p className="card-text text-start">{post.body}</p>;
  const editableTitle = (
    <input
      type="text"
      className="form-control text-start"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
  const editableBody = (
    <textarea
      className="form-control text-start"
      value={body}
      onChange={(e) => setBody(e.target.value)}
    />
  );
  const submitButton = (
    <button
      type="submit"
      className="form-control"
      onClick={(e) => submitHandler(e)}
    >
      Submit
    </button>
  );

  return (
    <div>
      <div className="row">
        <div className="col-8">{isEditing ? editableTitle : titleElement}</div>
        <div className="col-4">
          <ButtonGroup
            post_id={post.id}
            dispatch={dispatch}
            toggleEditForm={toggleEditForm}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-8">{isEditing ? editableBody : bodyElement}</div>
      </div>
      <div className="row">
        <div className="col-4">{isEditing ? submitButton : ''}</div>
      </div>
    </div>
  );
}

export default Post;
