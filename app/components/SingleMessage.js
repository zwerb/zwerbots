/* eslint-disable complexity */
import React from "react";
import { Link } from "react-router-dom";

export const SingleMessage = (props) => {
  const { message } = props || {};
  const { match, history } = props || [];
  console.log("Single message props:", props);

  return (
    <div className="all-items">
      <div className="single-item">
        {message && message.title ? (
          <div>
            <div className="item-meta-data">
              <div className="item-image">
                {" "}
                {message.imageUrl ? (
                  <img className="avatar" src={message.imageUrl} />
                ) : (
                  <img
                    className="avatar"
                    src="/images/icons/zwerb-z_logo-150.png"
                  />
                )}
              </div>
              <div className="item-title">
                {message.link ? (
                  <Link to={`${message.link}`}>{message.title}</Link>
                ) : (
                  <span>{message.title}</span>
                )}
              </div>
            </div>
            <div className="item-details">
              {message.header ? (
                <div className="item-header">{message.header}</div>
              ) : (
                ""
              )}
              {message.content?message.content.map((item, index) => (
                <div key={index} className="item-detail">
                  {item}
                </div>
              )):""}
            </div>
          </div>
        ) : (
          <div>
            <h4>Not Found</h4>
          </div>
        )}
      </div>
      {props.location && props.history ? (
        <div>
          <div style={{ textAlign: "center" }}>
            {props.location.pathname == "/" ? (
              ""
            ) : (
              <h4>
                <Link to={props.history.location.pathname}>Back</Link>
              </h4>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
