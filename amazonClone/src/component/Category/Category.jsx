import React from 'react'
import { categoryInfo } from './fullinfo'
import Card1 from './Card1'
import "./category.css";
function Category() {
  return (
    <section className="category__container">
      {categoryInfo.map((infos) => (
        <Card1 key={infos.id || infos.title} data={infos} />
      ))}
    </section>
  );
}

export default Category