import React from 'react'

export const Image = ({ media_url, caption, comments_count, like_count, permalink }) => {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={media_url} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">like{'>'}{like_count} comment{'>'}{comments_count}</h5>
                <p className="card-text">
                    {caption}
                </p>
                <a href={permalink} className="btn btn-primary">
                    GO TO POST
                </a>
            </div>
        </div>
    )
}
