import { Fieldset } from "primereact/fieldset";

export default function CategoryCard({ name }) {
  return (
    <Fieldset className="comment mb-5">
      <div className="flex flex-column gap-2">
        <p className="m-0">{name}</p>
        <p
          className="m-0 text-right"
          style={{
            fontSize: "0.8rem",
            color: "#999",
            marginTop: "4px",
          }}
        >
        </p>
      </div>
    </Fieldset>
  );
}