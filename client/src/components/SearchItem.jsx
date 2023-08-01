export default function SearchItem(item) {
    console.log(item);
  return (
    <div className="searchItem">{item.data?.name} {item.data?.price}$</div>
  )
}
