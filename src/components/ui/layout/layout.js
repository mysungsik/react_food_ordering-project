import LayoutFooter from "./layout-footer";
import LayoutHeader from "./layout-header";

function Layout(props) {
  return (
    <div>
      <LayoutHeader />
      {props.children}
      <LayoutFooter />
    </div>
  );
}
export default Layout;
