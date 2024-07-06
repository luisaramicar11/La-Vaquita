import layer from "../assets/img/layer-MC1.svg";
import { Link } from "react-router-dom";

export function GroupCard({ data }) {
  return (
    <>
      {data?.map((group) => (
        <div
          key={group.id}
          className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div
            className="w-full bg-cover bg-center rounded-t-lg md:rounded-l-lg"
            style={{
              backgroundColor: group.color,
              backgroundImage: `url(${layer})`,
              height: "200px", // Ajusta la altura según tus necesidades
              width:"200px"
            }}
          ></div>
          <div className="flex flex-col justify-between p-4 flex-1 leading-normal md:w-3/4">
            <h5 className="mb-1 text-2xl font-bold tracking-tight custom-text-dark-gray">
              {group.name}
            </h5>
            <p className="mb-1 font-bold">
              Debes:{" "}
              <span className="custom-text-red font-bold">{group.total_value}</span>
            </p>
            <p className="mb-1 font-bold">
              Participantes:{" "}
              <span className="custom-text-red font-bold">{group.friends}</span>
            </p>
            <div className="flex mt-2 md:mt-0">
              <button
                type="button"
                className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
              >
                <Link to={`/grupos/${group.id}`}>Ver</Link>
              </button>
              <button
                type="button"
                className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center mb-2"
              >
                Abandonar
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
