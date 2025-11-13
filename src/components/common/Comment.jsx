import { Fieldset } from "primereact/fieldset";

export default function Comment({ author, date, content }) {
  return (
    <Fieldset legend={author} className="comment mb-5">
      <div className="flex flex-column gap-2">
        <p className="m-0">{content}</p>
        <p
          className="m-0 text-right"
          style={{
            fontSize: "0.8rem",
            color: "#999",
            marginTop: "4px",
          }}
        >
          {date}
        </p>
      </div>
    </Fieldset>
  );
}
