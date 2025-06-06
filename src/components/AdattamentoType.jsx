export default function AdattamentoType({ data, request, title = null }) {
  const relation = data.data.relations.find((el) => el.relation === request);

  return (
    <div>
      {relation ? (
        <p>
          <strong>{title ? title : request}</strong>: {""}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={relation.entry[0].url}
          >
            {relation.entry[0].name}
          </a>
        </p>
      ) : null}
    </div>
  );
}
