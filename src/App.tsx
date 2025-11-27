import { useState } from 'react';
import './index.css';




export default function App() {
  type Item = {
    id: number;
    description: string;
    quantity: number;
    packed: boolean;
  };
  const [items, setItems] = useState<Item[]>([]);

   function handleAddItems(item: Item) {
    setItems((items) => [...items, item]);


  }

  function handleDeleteItem(id: number) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id: number) {
    setItems((items) => items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item ));  
  }

  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Stats items={items} />
    </div>
  )
}

function Logo() {
  return <div><h1>🏝️ Far Away 🧳</h1></div>;
}

function Form ({onAddItems}: {onAddItems: (item: {description: string; quantity: number; packed: boolean; id: number}) => void}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  

 

  function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!description) return;


    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    setDescription("");
    setQuantity(1);

    onAddItems(newItem);
  }
  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>what do you need for your 😍 trip?</h3>
      <select name="" id="" value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
        {Array.from({length:20}, (_, i) => i + 1).map(num => (
          <option  value={num} key={num}>{num}</option>
        ))}
      </select>
      <input type="text" placeholder='Item...' value={description} onChange={e => setDescription(e.target.value)} />
      <button>Add</button>
 
      </form>
  );
}

function PackingList({items, onDeleteItem,onToggleItem}: {items: {id: number; description: string; quantity: number; packed: boolean}[], onDeleteItem: (id: number) => void, onToggleItem: (id: number) => void}) {
  return (
  <div className='list'>
    <ul>
      {items.map(item => (
        <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
      ))}
    </ul>
  </div>
  );

}

function Item({item,onDeleteItem,onToggleItem}: {item: {id: number; description: string; quantity: number; packed: boolean; }, onDeleteItem: (id: number) => void, onToggleItem: (id: number) => void} ) {
  return(
  
    <li>
      <input type="checkbox" checked={item.packed} onChange={() =>{onToggleItem(item.id)}} />
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>{item.quantity}  {item.description}</span>
    <button onClick={() => onDeleteItem(item.id)}>❌</button> </li>
    

  
  )
}

function Stats({ items }: { items: Item[] }) {
  const total = items.length;
  const packed = items.filter(i => i.packed).length;
  const percentage = total === 0 ? 0 : Math.round((packed / total) * 100);
  return (
    <footer className="stats">{
      percentage === 100 ? " you got everything! ready to go! 👜 " :
      <em>👜 you have {total} items on your list, and you already packed {packed} ({percentage}%)</em>
      }
    </footer>
  );
}