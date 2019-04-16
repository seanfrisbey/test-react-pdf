import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import TestPdf from './TestPdf.pdf';
import './App.css';

class App extends Component {

    state = {
        pageNumber: 1,
        numPages: 1,
    }
    
    documentLoaded = false;

    onDocumentLoad = (pdf) => {
        this.documentLoaded = true;
        this.setState({
            pageNumber: 1,
            numPages: pdf.numPages })
    }

    onDocumentLoadError = () => {
        console.log("error");
        
    }

    onPageLoad = () => {
        console.log("loaded");
        
    }

    onPageRender = () => {
        console.log("rendered");
        
    }

    changePage = (change) => {
        const prevPage = this.state.pageNumber;
        const nextPage = prevPage + change;
        if (nextPage < 1 || nextPage > this.state.numPages) return;

        this.setState({ pageNumber: nextPage });
    }
  
    previousPage = () => this.changePage(-1);
  
    nextPage = () => this.changePage(1);

    render() {
        const { pageNumber, numPages } = this.state;
        const { documentLoaded } = this;

        return (
            <>
                <div className="App" style={{ height: "500px" }}>
                    <Document file={TestPdf} onLoadSuccess={this.onDocumentLoad} onLoadError={this.onDocumentLoadError}>
                        <Page renderMode={"canvas"} height={500}
                            onLoadSuccess={this.onPageLoad}
                            onRenderSuccess={this.onPageRender}
                            pageNumber={pageNumber} />
                    </Document>
                </div>
                <div id="page-turner"
                    style={{
                        display: "flex",
                        flexFlow: "row nowrap",
                        flex: '0 0 auto',
                        width: "10rem",
                        marginTop: "1rem",
                        height: "3rem",
                        justifyContent: "space-between",
                    }}>
                        <input type="button"
                            onClick={this.previousPage} value="<"
                            style={{ padding: "0px", height: "3rem", width: "3rem" }}/>
                        <div style={{ fontSize: "1.5rem", textAlign: "center", alignSelf: "center" }}>
                            {documentLoaded ? `${pageNumber} / ${numPages}` : '' }
                        </div>
                        <input type="button"
                            onClick={this.nextPage} value=">"
                            style={{ padding: "0px", height: "3rem", width: "3rem" }}/>
                </div>
                </>
        );
    }
}

export default App;
