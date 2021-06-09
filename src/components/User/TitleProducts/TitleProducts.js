import React from 'react'

function TitleProducts(props) {
    return (
        <div class=" container title_Product mt-4">
          <h2>
            <p style={{fontWeight: 500, color: "#003c2d", fontSize: "36px"}}>{props.title}</p>
            {/* <a href="#">{props.title}</a> */}
          </h2>
          <p>{props.description}</p>
        </div>
    )
}

export default TitleProducts
