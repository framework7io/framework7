import * as React from 'react';

declare namespace F7FabBackdrop {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    
  }
}
declare class F7FabBackdrop extends React.Component<F7FabBackdrop.Props, {}> {
  
}
export default F7FabBackdrop;