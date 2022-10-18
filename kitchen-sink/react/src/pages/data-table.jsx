import React from 'react';
import {
  Navbar,
  Page,
  BlockTitle,
  Link,
  Icon,
  Card,
  CardContent,
  CardHeader,
  BlockHeader,
  Checkbox,
} from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Data Table" backLink="Back"></Navbar>
    <BlockTitle>Plain table</BlockTitle>
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th className="label-cell">Dessert (100g serving)</th>
            <th className="numeric-cell">Calories</th>
            <th className="numeric-cell">Fat (g)</th>
            <th className="numeric-cell">Carbs</th>
            <th className="numeric-cell">Protein (g)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="label-cell">Frozen yogurt</td>
            <td className="numeric-cell">159</td>
            <td className="numeric-cell">6.0</td>
            <td className="numeric-cell">24</td>
            <td className="numeric-cell">4.0</td>
          </tr>
          <tr>
            <td className="label-cell">Ice cream sandwich</td>
            <td className="numeric-cell">237</td>
            <td className="numeric-cell">9.0</td>
            <td className="numeric-cell">37</td>
            <td className="numeric-cell">4.4</td>
          </tr>
          <tr>
            <td className="label-cell">Eclair</td>
            <td className="numeric-cell">262</td>
            <td className="numeric-cell">16.0</td>
            <td className="numeric-cell">24</td>
            <td className="numeric-cell">6.0</td>
          </tr>
          <tr>
            <td className="label-cell">Cupcake</td>
            <td className="numeric-cell">305</td>
            <td className="numeric-cell">3.7</td>
            <td className="numeric-cell">67</td>
            <td className="numeric-cell">4.3</td>
          </tr>
        </tbody>
      </table>
    </div>
    <BlockTitle>Within card</BlockTitle>
    <Card className="data-table">
      <table>
        <thead>
          <tr>
            <th className="label-cell">Dessert (100g serving)</th>
            <th className="numeric-cell">Calories</th>
            <th className="numeric-cell">Fat (g)</th>
            <th className="numeric-cell">Carbs</th>
            <th className="numeric-cell">Protein (g)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="label-cell">Frozen yogurt</td>
            <td className="numeric-cell">159</td>
            <td className="numeric-cell">6.0</td>
            <td className="numeric-cell">24</td>
            <td className="numeric-cell">4.0</td>
          </tr>
          <tr>
            <td className="label-cell">Ice cream sandwich</td>
            <td className="numeric-cell">237</td>
            <td className="numeric-cell">9.0</td>
            <td className="numeric-cell">37</td>
            <td className="numeric-cell">4.4</td>
          </tr>
          <tr>
            <td className="label-cell">Eclair</td>
            <td className="numeric-cell">262</td>
            <td className="numeric-cell">16.0</td>
            <td className="numeric-cell">24</td>
            <td className="numeric-cell">6.0</td>
          </tr>
          <tr>
            <td className="label-cell">Cupcake</td>
            <td className="numeric-cell">305</td>
            <td className="numeric-cell">3.7</td>
            <td className="numeric-cell">67</td>
            <td className="numeric-cell">4.3</td>
          </tr>
        </tbody>
      </table>
    </Card>

    <BlockTitle>Selectable rows</BlockTitle>
    <Card className="data-table data-table-init">
      <table>
        <thead>
          <tr>
            <th className="checkbox-cell">
              <Checkbox />
            </th>
            <th className="label-cell">Dessert (100g serving)</th>
            <th className="numeric-cell">Calories</th>
            <th className="numeric-cell">Fat (g)</th>
            <th className="numeric-cell">Carbs</th>
            <th className="numeric-cell">Protein (g)</th>
            <th className="checkbox-cell">
              <Checkbox />
              <span>In Stock</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="checkbox-cell">
              <Checkbox />
            </td>
            <td className="label-cell">Frozen yogurt</td>
            <td className="numeric-cell">159</td>
            <td className="numeric-cell">6.0</td>
            <td className="numeric-cell">24</td>
            <td className="numeric-cell">4.0</td>
            <td className="checkbox-cell">
              <Checkbox />
            </td>
          </tr>
          <tr>
            <td className="checkbox-cell">
              <Checkbox />
            </td>
            <td className="label-cell">Ice cream sandwich</td>
            <td className="numeric-cell">237</td>
            <td className="numeric-cell">9.0</td>
            <td className="numeric-cell">37</td>
            <td className="numeric-cell">4.4</td>
            <td className="checkbox-cell">
              <Checkbox />
            </td>
          </tr>
          <tr>
            <td className="checkbox-cell">
              <Checkbox />
            </td>
            <td className="label-cell">Eclair</td>
            <td className="numeric-cell">262</td>
            <td className="numeric-cell">16.0</td>
            <td className="numeric-cell">24</td>
            <td className="numeric-cell">6.0</td>
            <td className="checkbox-cell">
              <Checkbox />
            </td>
          </tr>
          <tr>
            <td className="checkbox-cell">
              <Checkbox />
            </td>
            <td className="label-cell">Cupcake</td>
            <td className="numeric-cell">305</td>
            <td className="numeric-cell">3.7</td>
            <td className="numeric-cell">67</td>
            <td className="numeric-cell">4.3</td>
            <td className="checkbox-cell">
              <Checkbox />
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
    <BlockTitle>Tablet-only columns</BlockTitle>
    <BlockHeader>
      <p>
        "Comments" column will be visible only on devices with screen width {'>'}= 768px (tablets)
      </p>
    </BlockHeader>
    <Card className="data-table data-table-init">
      <table>
        <thead>
          <tr>
            <th className="checkbox-cell">
              <Checkbox />
            </th>
            <th className="label-cell">Dessert (100g serving)</th>
            <th className="numeric-cell">Calories</th>
            <th className="numeric-cell">Fat (g)</th>
            <th className="numeric-cell">Carbs</th>
            <th className="numeric-cell">Protein (g)</th>
            <th className="medium-only">
              <Icon ios="f7:chat_bubble_text_fill" md="material:message" /> Comments
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="checkbox-cell">
              <Checkbox />
            </td>
            <td className="label-cell">Frozen yogurt</td>
            <td className="numeric-cell">159</td>
            <td className="numeric-cell">6.0</td>
            <td className="numeric-cell">24</td>
            <td className="numeric-cell">4.0</td>
            <td className="medium-only">I like frozen yogurt</td>
          </tr>
          <tr>
            <td className="checkbox-cell">
              <Checkbox />
            </td>
            <td className="label-cell">Ice cream sandwich</td>
            <td className="numeric-cell">237</td>
            <td className="numeric-cell">9.0</td>
            <td className="numeric-cell">37</td>
            <td className="numeric-cell">4.4</td>
            <td className="medium-only">But like ice cream more</td>
          </tr>
          <tr>
            <td className="checkbox-cell">
              <Checkbox />
            </td>
            <td className="label-cell">Eclair</td>
            <td className="numeric-cell">262</td>
            <td className="numeric-cell">16.0</td>
            <td className="numeric-cell">24</td>
            <td className="numeric-cell">6.0</td>
            <td className="medium-only">Super tasty</td>
          </tr>
          <tr>
            <td className="checkbox-cell">
              <Checkbox />
            </td>
            <td className="label-cell">Cupcake</td>
            <td className="numeric-cell">305</td>
            <td className="numeric-cell">3.7</td>
            <td className="numeric-cell">67</td>
            <td className="numeric-cell">4.3</td>
            <td className="medium-only">Don't like it</td>
          </tr>
        </tbody>
      </table>
    </Card>

    <BlockTitle>With inputs</BlockTitle>
    <BlockHeader>
      Such tables are widely used in admin interfaces for filtering or search data
    </BlockHeader>
    <Card className="data-table">
      <table>
        <thead>
          <tr>
            <th className="input-cell">
              <span className="table-head-label">ID</span>
              <div className="input" style={{ width: '50px' }}>
                <input type="number" placeholder="Filter" />
              </div>
            </th>
            <th className="input-cell">
              <span className="table-head-label">Name</span>
              <div className="input">
                <input type="text" placeholder="Filter" />
              </div>
            </th>
            <th className="input-cell">
              <span className="table-head-label">Email</span>
              <div className="input">
                <input type="email" placeholder="Filter" />
              </div>
            </th>
            <th className="input-cell">
              <span className="table-head-label">Gender</span>
              <div className="input input-dropdown">
                <select>
                  <option value="All">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>john@doe.com</td>
            <td>Male</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Doe</td>
            <td>jane@doe.com</td>
            <td>Female</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Vladimir Kharlampidi</td>
            <td>vladimir@google.com</td>
            <td>Male</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Jennifer Doe</td>
            <td>jennifer@doe.com</td>
            <td>Female</td>
          </tr>
        </tbody>
      </table>
    </Card>
    <BlockTitle>Within card with title and actions</BlockTitle>
    <Card className="data-table data-table-init">
      <CardHeader>
        <div className="data-table-title">Nutrition</div>
        <div className="data-table-actions">
          <Link iconIos="f7:line_horizontal_3_decrease" iconMd="material:sort" />
          <Link iconIos="f7:ellipsis_vertical_circle" iconMd="material:more_vert" />
        </div>
      </CardHeader>
      <CardContent padding={false}>
        <table>
          <thead>
            <tr>
              <th className="checkbox-cell">
                <Checkbox />
              </th>
              <th className="label-cell">Dessert (100g serving)</th>
              <th className="numeric-cell">Calories</th>
              <th className="numeric-cell">Fat (g)</th>
              <th className="numeric-cell">Carbs</th>
              <th className="numeric-cell">Protein (g)</th>
              <th className="medium-only">
                <Icon ios="f7:chat_bubble_text_fill" md="material:message" /> Comments
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Frozen yogurt</td>
              <td className="numeric-cell">159</td>
              <td className="numeric-cell">6.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">4.0</td>
              <td className="medium-only">I like frozen yogurt</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Ice cream sandwich</td>
              <td className="numeric-cell">237</td>
              <td className="numeric-cell">9.0</td>
              <td className="numeric-cell">37</td>
              <td className="numeric-cell">4.4</td>
              <td className="medium-only">But like ice cream more</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Eclair</td>
              <td className="numeric-cell">262</td>
              <td className="numeric-cell">16.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">6.0</td>
              <td className="medium-only">Super tasty</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Cupcake</td>
              <td className="numeric-cell">305</td>
              <td className="numeric-cell">3.7</td>
              <td className="numeric-cell">67</td>
              <td className="numeric-cell">4.3</td>
              <td className="medium-only">Don't like it</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>

    <BlockTitle>Sortable columns</BlockTitle>
    <Card className="data-table data-table-init">
      <CardHeader>
        <div className="data-table-title">Nutrition</div>
        <div className="data-table-actions">
          <Link iconIos="f7:line_horizontal_3_decrease" iconMd="material:sort" />
          <Link iconIos="f7:ellipsis_vertical_circle" iconMd="material:more_vert" />
        </div>
      </CardHeader>
      <CardContent padding={false}>
        <table>
          <thead>
            <tr>
              <th className="checkbox-cell">
                <Checkbox />
              </th>
              <th className="label-cell sortable-cell sortable-cell-active">
                Desert (100g serving)
              </th>
              <th className="numeric-cell sortable-cell">Calories</th>
              <th className="numeric-cell sortable-cell">Fat (g)</th>
              <th className="numeric-cell sortable-cell">Carbs</th>
              <th className="numeric-cell sortable-cell">Protein (g)</th>
              <th className="medium-only">
                <Icon ios="f7:chat_bubble_text_fill" md="material:message" /> Comments
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Frozen yogurt</td>
              <td className="numeric-cell">159</td>
              <td className="numeric-cell">6.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">4.0</td>
              <td className="medium-only">I like frozen yogurt</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Ice cream sandwich</td>
              <td className="numeric-cell">237</td>
              <td className="numeric-cell">9.0</td>
              <td className="numeric-cell">37</td>
              <td className="numeric-cell">4.4</td>
              <td className="medium-only">But like ice cream more</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Eclair</td>
              <td className="numeric-cell">262</td>
              <td className="numeric-cell">16.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">6.0</td>
              <td className="medium-only">Super tasty</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Cupcake</td>
              <td className="numeric-cell">305</td>
              <td className="numeric-cell">3.7</td>
              <td className="numeric-cell">67</td>
              <td className="numeric-cell">4.3</td>
              <td className="medium-only">Don't like it</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
    <BlockTitle>With title and different actions on select</BlockTitle>
    <Card className="data-table data-table-init">
      <CardHeader>
        <div className="data-table-header">
          <div className="data-table-title">Nutrition</div>
          <div className="data-table-actions">
            <Link iconIos="f7:line_horizontal_3_decrease" iconMd="material:sort" />
            <Link iconIos="f7:ellipsis_vertical_circle" iconMd="material:more_vert" />
          </div>
        </div>
        <div className="data-table-header-selected">
          <div className="data-table-title-selected">
            <span className="data-table-selected-count"></span> items selected
          </div>
          <div className="data-table-actions">
            <Link iconIos="f7:trash" iconMd="material:delete" />
            <Link iconIos="f7:ellipsis_vertical_circle" iconMd="material:more_vert" />
          </div>
        </div>
      </CardHeader>
      <CardContent padding={false}>
        <table>
          <thead>
            <tr>
              <th className="checkbox-cell">
                <Checkbox />
              </th>
              <th className="label-cell">Dessert (100g serving)</th>
              <th className="numeric-cell">Calories</th>
              <th className="numeric-cell">Fat (g)</th>
              <th className="numeric-cell">Carbs</th>
              <th className="numeric-cell">Protein (g)</th>
              <th className="medium-only">
                <Icon ios="f7:chat_bubble_text_fill" md="material:message" /> Comments
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Frozen yogurt</td>
              <td className="numeric-cell">159</td>
              <td className="numeric-cell">6.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">4.0</td>
              <td className="medium-only">I like frozen yogurt</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Ice cream sandwich</td>
              <td className="numeric-cell">237</td>
              <td className="numeric-cell">9.0</td>
              <td className="numeric-cell">37</td>
              <td className="numeric-cell">4.4</td>
              <td className="medium-only">But like ice cream more</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Eclair</td>
              <td className="numeric-cell">262</td>
              <td className="numeric-cell">16.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">6.0</td>
              <td className="medium-only">Super tasty</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Cupcake</td>
              <td className="numeric-cell">305</td>
              <td className="numeric-cell">3.7</td>
              <td className="numeric-cell">67</td>
              <td className="numeric-cell">4.3</td>
              <td className="medium-only">Don't like it</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>

    <BlockTitle>Alternate header with actions</BlockTitle>
    <Card className="data-table data-table-init">
      <CardHeader>
        <div className="data-table-links">
          <a className="button">Add</a>
          <a className="button">Remove</a>
        </div>
        <div className="data-table-actions">
          <Link iconIos="f7:line_horizontal_3_decrease" iconMd="material:sort" />
          <Link iconIos="f7:ellipsis_vertical_circle" iconMd="material:more_vert" />
        </div>
      </CardHeader>
      <CardContent padding={false}>
        <table>
          <thead>
            <tr>
              <th className="checkbox-cell">
                <Checkbox />
              </th>
              <th className="label-cell">Dessert (100g serving)</th>
              <th className="numeric-cell">Calories</th>
              <th className="numeric-cell">Fat (g)</th>
              <th className="numeric-cell">Carbs</th>
              <th className="numeric-cell">Protein (g)</th>
              <th className="medium-only">
                <Icon ios="f7:chat_bubble_text_fill" md="material:message" /> Comments
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Frozen yogurt</td>
              <td className="numeric-cell">159</td>
              <td className="numeric-cell">6.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">4.0</td>
              <td className="medium-only">I like frozen yogurt</td>
              <td className="actions-cell">
                <Link iconIos="f7:square_pencil" iconMd="material:edit" />
                <Link iconIos="f7:trash" iconMd="material:delete" />
              </td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Ice cream sandwich</td>
              <td className="numeric-cell">237</td>
              <td className="numeric-cell">9.0</td>
              <td className="numeric-cell">37</td>
              <td className="numeric-cell">4.4</td>
              <td className="medium-only">But like ice cream more</td>
              <td className="actions-cell">
                <Link iconIos="f7:square_pencil" iconMd="material:edit" />
                <Link iconIos="f7:trash" iconMd="material:delete" />
              </td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Eclair</td>
              <td className="numeric-cell">262</td>
              <td className="numeric-cell">16.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">6.0</td>
              <td className="medium-only">Super tasty</td>
              <td className="actions-cell">
                <Link iconIos="f7:square_pencil" iconMd="material:edit" />
                <Link iconIos="f7:trash" iconMd="material:delete" />
              </td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <Checkbox />
              </td>
              <td className="label-cell">Cupcake</td>
              <td className="numeric-cell">305</td>
              <td className="numeric-cell">3.7</td>
              <td className="numeric-cell">67</td>
              <td className="numeric-cell">4.3</td>
              <td className="medium-only">Don't like it</td>
              <td className="actions-cell">
                <Link iconIos="f7:square_pencil" iconMd="material:edit" />
                <Link iconIos="f7:trash" iconMd="material:delete" />
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>

    <BlockTitle>Collapsible</BlockTitle>
    <BlockHeader>
      <p>The following table will be collapsed to kind of List View on small screens:</p>
    </BlockHeader>
    <Card className="data-table data-table-collapsible data-table-init">
      <CardHeader>
        <div className="data-table-title">Nutrition</div>
        <div className="data-table-actions">
          <Link iconIos="f7:line_horizontal_3_decrease" iconMd="material:sort" />
          <Link iconIos="f7:ellipsis_vertical_circle" iconMd="material:more_vert" />
        </div>
      </CardHeader>
      <CardContent padding={false}>
        <table>
          <thead>
            <tr>
              <th className="label-cell">Dessert (100g serving)</th>
              <th className="numeric-cell">Calories</th>
              <th className="numeric-cell">Fat (g)</th>
              <th className="numeric-cell">Carbs</th>
              <th className="numeric-cell">Protein (g)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="label-cell">Frozen yogurt</td>
              <td className="numeric-cell">159</td>
              <td className="numeric-cell">6.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">4.0</td>
            </tr>
            <tr>
              <td className="label-cell">Ice cream sandwich</td>
              <td className="numeric-cell">237</td>
              <td className="numeric-cell">9.0</td>
              <td className="numeric-cell">37</td>
              <td className="numeric-cell">4.4</td>
            </tr>
            <tr>
              <td className="label-cell">Eclair</td>
              <td className="numeric-cell">262</td>
              <td className="numeric-cell">16.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">6.0</td>
            </tr>
            <tr>
              <td className="label-cell">Cupcake</td>
              <td className="numeric-cell">305</td>
              <td className="numeric-cell">3.7</td>
              <td className="numeric-cell">67</td>
              <td className="numeric-cell">4.3</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  </Page>
);
