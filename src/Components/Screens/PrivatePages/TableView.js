import React, { useState } from 'react'

function TableView({list}) {
    const [update,setupdate] = useState(0)
    const clickHandler = (url) => {
        url.clicks = url.clicks + 1
        setupdate(url.clicks)
    }
    return (
        <div className='table-responsive'>
            <table className="table table-striped table-hover text-white">
            <thead>
                <tr>
                <th scope='col'>Long URL</th>
                <th scope="col">ShortURL</th>
                <th scope="col">Clicks</th>
                </tr>
            </thead>
            <tbody>
                {
                    list.map((url,index) =>{
                        return <tr key = {index}>
                            <td>
                                <a target="_blank" href={url.longURL}  className ='cut-text'>
                                    {url.longURL}
                                </a>
                                
                            </td>
                            <td>
                                <a target="_blank" onClick={() => clickHandler(url)} href={url.shortUrl}>
                                    {url.shortUrl}
                                </a>
                            </td>
                            <td>{url.clicks}</td>
                        </tr>
                    })
                }
                
                
            </tbody>
        </table>
        </div>
    )
}

export default TableView
