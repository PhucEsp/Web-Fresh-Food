import React from 'react'

function TitleProducts(props) {
    return (
        <div class=" container title_Product mt-4">
          <h2>
            <a href="list_product.html">{props.title}</a>
          </h2>
          <p>{props.description}</p>
        </div>
    )
}

export default TitleProducts
