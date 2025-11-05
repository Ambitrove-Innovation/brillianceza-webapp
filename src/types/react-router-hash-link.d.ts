declare module "react-router-hash-link" {
    import * as React from "react";
    import { HashLinkProps } from "react-router-dom";
    
    export const HashLink: React.FC<
      HashLinkProps & { smooth?: boolean; to: string; className?: string }
    >;
  
    export default HashLink;
  }
  