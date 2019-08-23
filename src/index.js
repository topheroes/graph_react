import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

const App = () =>
{
    const [categories,  setCategories] = useState([]);

    useEffect( () =>
    {
        fetch('http://localhost/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            query: `
                {
                    productCategories(where: {childless: false}) {
                        nodes {
                          name
                          productCategoryId
                          products {
                            nodes {
                              name
                              productId
                              image {
                                mediaDetails {
                                  sizes {
                                    sourceUrl
                                    height
                                  }
                                }
                              }
                              description
                            }
                          }
                        }
                      }
                }
            `,
            }),
        })
        .then(res => res.json())
        .then(res => {console.log(res);setCategories(res.data.productCategories.nodes)})
        .catch(err => console.error(err))
    
    }, []);

    
    
    return (
        categories.map( (v) =>
            {
                return (
                    <div className="category">
                        <h1 className="category-name">{v.name}</h1>
                        {v.products.nodes.map( (j) =>
                            {
                                return (
                                    <div className="caterogy-item">
                                        <h1>{j.name}</h1>
                                        <img src={j.image.mediaDetails.sizes[0].sourceUrl}/>
                                        <p>{j.description}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            })
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));