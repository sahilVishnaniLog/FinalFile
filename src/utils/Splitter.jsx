import React  , { useState, useCallback , useRef , useState} from 'react' ; 

 
 export const  SplitterX = (props)=> { 
    
    return <SplitterBase {...props} orientation="horizontal" /> 

}

expoer const SplitterY = (props) => { 
    return ( 
        <SplitterBase {...props} orientation="vertical" /> 
    )
}
