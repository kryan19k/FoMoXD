import { useWeb3 } from '../../../contexts/providers';
import './PageHeader.css';

function PageHeader(props: {
  title?: string;
  isShowBuyButton?: boolean;
  activeIndex?: any;
  buyPuffs?: any;
}) {
  const { gameContract } = useWeb3();
  if (props.isShowBuyButton) {
    return (
      <div className="page-header">
        <h1
          className={`page-title ${props.isShowBuyButton === true ? 'buy-button' : ''}`}
          onClick={props.buyPuffs}>
          {props?.title?.toUpperCase()}
        </h1>
      </div>
    );
  } else {
    return (
      <div className="page-header">
        <h1 className={`page-title`}>{props?.title?.toUpperCase()}</h1>
      </div>
    );
  }
}

export default PageHeader;
