import { useEffect, useState } from "react";

export default function ItemsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://192.168.50.49:3005/items")
      .then(res => {
        if (!res.ok) throw new Error("Hiba a lekérésnél");
        return res.json();
      })
      .then(data => {
        setItems(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>Hiba történt: {error}</p>;
  if (items.length === 0) return <p>Nincs elem az adatbázisban.</p>;

  return (
    <div>
      <h2>Összes item</h2>
      <ul>
        {items.map(item => (
          <li key={item.id ?? Math.random()}>
            {JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}