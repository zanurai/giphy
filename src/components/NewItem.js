import React from 'react'

const NewItem = (props) => {

    let { title, description, urlToImage, url, author, date, source } = props
    return (
        <>
            <div>
                <div className="container my-3">

                    <div className="card" style={{ width: "20rem" }}>
                        <div style={{
                            display: "flex",
                            justifyContant: "flex-end",
                            position: "absolute",
                            right: "0",


                        }
                        }>
                            <span className=" badge rounded-pill bg-danger">{source}</span> {/*style={{ left: '100%', zIndex: '1' }}*/}


                        </div>
                        <img src={!urlToImage ? "https://images.moneycontrol.com/static-mcnews/2023/01/budget2-770x433.jpg" : urlToImage} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}<span className="badge bg-secondary">New</span> {/*style={{ left: '100%', zIndex: '1' }}*/}

                                <span className="visually-hidden">unread messages</span>

                            </h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-success"> By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                            <a href={url} target="_blank" className="btn btn-dark">Read More</a>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}

export default NewItem;

