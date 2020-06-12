import React from 'react';
import { Navbar, Page, BlockTitle, Block, Segmented, Button, Gauge, Row, Col } from 'framework7-react';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      gaugeValue: 0.5,
    };
  }

  render() {
    return (
      <Page>
        <Navbar title="Gauge" backLink="Back"></Navbar>
        <Block strong>
          <p>Framework7 comes with Gauge component. It produces nice looking fully responsive SVG gauges.</p>
        </Block>
        <Block strong className="text-align-center">
          <Gauge
            type="circle"
            value={this.state.gaugeValue}
            size={250}
            borderColor="#2196f3"
            borderWidth={10}
            valueText={`${this.state.gaugeValue * 100}%`}
            valueFontSize={41}
            valueTextColor="#2196f3"
            labelText="amount of something"
          />
          <Segmented tag="p" raised>
            <Button active={this.state.gaugeValue === 0} onClick={() => this.setState({ gaugeValue: 0 })}>0%</Button>
            <Button active={this.state.gaugeValue === 0.25} onClick={() => this.setState({ gaugeValue: 0.25 })}>25%</Button>
            <Button active={this.state.gaugeValue === 0.5} onClick={() => this.setState({ gaugeValue: 0.5 })}>50%</Button>
            <Button active={this.state.gaugeValue === 0.75} onClick={() => this.setState({ gaugeValue: 0.75 })}>75%</Button>
            <Button active={this.state.gaugeValue === 1} onClick={() => this.setState({ gaugeValue: 1 })}>100%</Button>
          </Segmented>
        </Block>

        <BlockTitle>Circle Gauges</BlockTitle>
        <Block strong>
          <Row>
            <Col className="text-align-center">
              <Gauge
                type="circle"
                value={0.44}
                valueText="44%"
                valueTextColor="#ff9800"
                borderColor="#ff9800"
              />
            </Col>
            <Col className="text-align-center">
              <Gauge
                type="circle"
                value={0.12}
                valueText="$120"
                valueTextColor="#4caf50"
                borderColor="#4caf50"
                labelText="of $1000 budget"
                labelTextColor="#f44336"
                labelFontWeight={700}
              />
            </Col>
          </Row>
        </Block>
        <BlockTitle>Semicircle Gauges</BlockTitle>
        <Block strong>
          <Row>
            <Col className="text-align-center">
              <Gauge
                type="semicircle"
                value={0.3}
                valueText="30%"
                valueTextColor="#f44336"
                borderColor="#f44336"
              />
            </Col>
            <Col className="text-align-center">
              <Gauge
                type="semicircle"
                value={0.5}
                valueText="30kg"
                valueTextColor="#e91e63"
                borderColor="#e91e63"
                labelText="of 60kg total"
                labelTextColor="#333"
              />
            </Col>
          </Row>
        </Block>
        <BlockTitle>Customization</BlockTitle>
        <Block strong>
          <Row>
            <Col className="text-align-center">
              <Gauge
                type="circle"
                value={0.35}
                valueText="35%"
                valueTextColor="#4caf50"
                valueFontSize={51}
                valueFontWeight={700}
                borderWidth={20}
                borderColor="#4caf50"
                borderBgColor="#ffeb3b"
                bgColor="#ffeb3b"
              />
            </Col>
            <Col className="text-align-center">
              <Gauge
                type="circle"
                value={0.67}
                valueText="$670"
                valueTextColor="#000"
                borderColor="#ff9800"
                labelText="of $1000 spent"
                labelTextColor="#4caf50"
                labelFontWeight={800}
                labelFontSize={12}
                borderWidth={30}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="text-align-center">
              <Gauge
                type="semicircle"
                value={0.5}
                valueText="50%"
                valueTextColor="#ffeb3b"
                valueFontSize={41}
                valueFontWeight={700}
                borderWidth={10}
                borderColor="#ffeb3b"
                borderBgColor="transparent"
              />
            </Col>
            <Col className="text-align-center">
              <Gauge
                type="semicircle"
                value={0.77}
                borderColor="#ff9800"
                labelText="$770 spent so far"
                labelTextColor="#ff9800"
                labelFontWeight={800}
                labelFontSize={12}
                borderWidth={10}
              />
            </Col>
          </Row>
        </Block>
      </Page>
    )
  }
}