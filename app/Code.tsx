'use client';
//Super expression must either be null or a function
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneSea } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Code(props: { children: string | string[]; }){
    return (
       <>
    
    <SyntaxHighlighter language="javascript" style={duotoneSea}>
        {props.children}
        </SyntaxHighlighter>
       </>
    )
}
