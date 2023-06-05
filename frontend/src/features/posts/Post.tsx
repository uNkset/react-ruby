import React, { useEffect, useState } from 'react';
import ButtonGroup from './ButtonGroup';

function Post(props: any) {
  const { post, dispatch } = props;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  function submitHandler(e: any) {
    e.preventDefault();
    const formData = {
      post: {
        id: post.id,
        title: title,
        body: body,
      },
    };
    resetState();
  }

  function resetState() {
    setTitle(post.title);
    setBody(post.body);
  }

  const titleElement = <h2 className="title text-start">{props.post.title}</h2>;
  const bodyElement = <p className="card-text text-start">{props.post.body}</p>;
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
        <div className="col-8">{titleElement}</div>
        <div className="col-4">
          <ButtonGroup post_id={post.id} dispatch={dispatch} />
        </div>
      </div>
      <div className="row">
        <div className="col-8">{bodyElement}</div>
      </div>
      <div className="row">
        <div className="col-4">{submitButton}</div>
      </div>
    </div>
  );
}

export default Post;
