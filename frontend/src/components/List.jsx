import React from 'react'

function List() {

    const list = [{ title: "Read", username: "bhagesh", password: "helloworld" }]

    return (
        <div className='w-full'>
            <div className="w-full list text-white p-5">
                {list.map((items, index) => {
                    return (
                        
                        <div className="flex justify-around gap-2.5 return" key={index}>
                            <div>
                                {items.title}
                            </div>
                            <div>
                                {items.username}
                            </div>
                            <div>
                                {items.password}
                            </div>
                            <div className="edit">

                            </div>
                            <div className="delete">
                                
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List
