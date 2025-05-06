import Card from "@/components/card";
import './page.css';

const data = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
]
export default function Home() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">Home</h2>
      <div className="card-container">
        {...data.map(i => <Card key={i} />)}
      </div>
    </section>
  );
}
