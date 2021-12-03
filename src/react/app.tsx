import ReactDOMServer from "react-dom/server";

export function render() {
  return ReactDOMServer.renderToString(<div>rendered on the edge</div>);
}
