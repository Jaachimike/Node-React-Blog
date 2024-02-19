import React from "react";

const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://techcrunch.com/wp-content/uploads/2019/08/GettyImages-1158411075.jpg?w=1390&crop=1"
          alt=""
        />
      </div>

      <div className=" texts">
        <h2>Full-house battery backup coming later this year</h2>
        <p className="info">
          <a className="author">Jaachi Okafor</a>
          <time>16-02-2024 15:53</time>
        </p>
        <p className="summary">
          After scaling back operations and reassigning staff to other projects,
          Tumblr owner Automattic’s CEO Matt Mullenweg said that the company
          would home in on the parts of Tumblr’s service that worked and kill
          those that didn’t —
        </p>
      </div>
    </div>
  );
};

export default Post;
