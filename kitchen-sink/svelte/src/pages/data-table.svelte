<script>
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
  } from 'framework7-svelte';
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<Page>
  <Navbar title="Data Table" backLink="Back" />
  <BlockTitle>Plain table</BlockTitle>
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th class="label-cell">Dessert (100g serving)</th>
          <th class="numeric-cell">Calories</th>
          <th class="numeric-cell">Fat (g)</th>
          <th class="numeric-cell">Carbs</th>
          <th class="numeric-cell">Protein (g)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="label-cell">Frozen yogurt</td>
          <td class="numeric-cell">159</td>
          <td class="numeric-cell">6.0</td>
          <td class="numeric-cell">24</td>
          <td class="numeric-cell">4.0</td>
        </tr>
        <tr>
          <td class="label-cell">Ice cream sandwich</td>
          <td class="numeric-cell">237</td>
          <td class="numeric-cell">9.0</td>
          <td class="numeric-cell">37</td>
          <td class="numeric-cell">4.4</td>
        </tr>
        <tr>
          <td class="label-cell">Eclair</td>
          <td class="numeric-cell">262</td>
          <td class="numeric-cell">16.0</td>
          <td class="numeric-cell">24</td>
          <td class="numeric-cell">6.0</td>
        </tr>
        <tr>
          <td class="label-cell">Cupcake</td>
          <td class="numeric-cell">305</td>
          <td class="numeric-cell">3.7</td>
          <td class="numeric-cell">67</td>
          <td class="numeric-cell">4.3</td>
        </tr>
      </tbody>
    </table>
  </div>
  <BlockTitle>Within card</BlockTitle>
  <Card class="data-table">
    <table>
      <thead>
        <tr>
          <th class="label-cell">Dessert (100g serving)</th>
          <th class="numeric-cell">Calories</th>
          <th class="numeric-cell">Fat (g)</th>
          <th class="numeric-cell">Carbs</th>
          <th class="numeric-cell">Protein (g)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="label-cell">Frozen yogurt</td>
          <td class="numeric-cell">159</td>
          <td class="numeric-cell">6.0</td>
          <td class="numeric-cell">24</td>
          <td class="numeric-cell">4.0</td>
        </tr>
        <tr>
          <td class="label-cell">Ice cream sandwich</td>
          <td class="numeric-cell">237</td>
          <td class="numeric-cell">9.0</td>
          <td class="numeric-cell">37</td>
          <td class="numeric-cell">4.4</td>
        </tr>
        <tr>
          <td class="label-cell">Eclair</td>
          <td class="numeric-cell">262</td>
          <td class="numeric-cell">16.0</td>
          <td class="numeric-cell">24</td>
          <td class="numeric-cell">6.0</td>
        </tr>
        <tr>
          <td class="label-cell">Cupcake</td>
          <td class="numeric-cell">305</td>
          <td class="numeric-cell">3.7</td>
          <td class="numeric-cell">67</td>
          <td class="numeric-cell">4.3</td>
        </tr>
      </tbody>
    </table>
  </Card>

  <BlockTitle>Selectable rows</BlockTitle>
  <Card class="data-table data-table-init">
    <table>
      <thead>
        <tr>
          <th class="checkbox-cell">
            <Checkbox />
          </th>
          <th class="label-cell">Dessert (100g serving)</th>
          <th class="numeric-cell">Calories</th>
          <th class="numeric-cell">Fat (g)</th>
          <th class="numeric-cell">Carbs</th>
          <th class="numeric-cell">Protein (g)</th>
          <th class="checkbox-cell">
            <Checkbox />
            <span>In Stock</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="checkbox-cell">
            <Checkbox />
          </td>
          <td class="label-cell">Frozen yogurt</td>
          <td class="numeric-cell">159</td>
          <td class="numeric-cell">6.0</td>
          <td class="numeric-cell">24</td>
          <td class="numeric-cell">4.0</td>
          <td class="checkbox-cell">
            <Checkbox />
          </td>
        </tr>
        <tr>
          <td class="checkbox-cell">
            <Checkbox />
          </td>
          <td class="label-cell">Ice cream sandwich</td>
          <td class="numeric-cell">237</td>
          <td class="numeric-cell">9.0</td>
          <td class="numeric-cell">37</td>
          <td class="numeric-cell">4.4</td>
          <td class="checkbox-cell">
            <Checkbox />
          </td>
        </tr>
        <tr>
          <td class="checkbox-cell">
            <Checkbox />
          </td>
          <td class="label-cell">Eclair</td>
          <td class="numeric-cell">262</td>
          <td class="numeric-cell">16.0</td>
          <td class="numeric-cell">24</td>
          <td class="numeric-cell">6.0</td>
          <td class="checkbox-cell">
            <Checkbox />
          </td>
        </tr>
        <tr>
          <td class="checkbox-cell">
            <Checkbox />
          </td>
          <td class="label-cell">Cupcake</td>
          <td class="numeric-cell">305</td>
          <td class="numeric-cell">3.7</td>
          <td class="numeric-cell">67</td>
          <td class="numeric-cell">4.3</td>
          <td class="checkbox-cell">
            <Checkbox />
          </td>
        </tr>
      </tbody>
    </table>
  </Card>
  <BlockTitle>Tablet-only columns</BlockTitle>
  <BlockHeader>
    <p>"Comments" column will be visible only on devices with screen width >= 768px (tablets)</p>
  </BlockHeader>
  <Card class="data-table data-table-init">
    <table>
      <thead>
        <tr>
          <th class="checkbox-cell">
            <Checkbox />
          </th>
          <th class="label-cell">Dessert (100g serving)</th>
          <th class="numeric-cell">Calories</th>
          <th class="numeric-cell">Fat (g)</th>
          <th class="numeric-cell">Carbs</th>
          <th class="numeric-cell">Protein (g)</th>
          <th class="medium-only"
            ><Icon ios="f7:chat_bubble_text_fill" md="material:message" /> Comments</th
          >
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="checkbox-cell">
            <Checkbox />
          </td>
          <td class="label-cell">Frozen yogurt</td>
          <td class="numeric-cell">159</td>
          <td class="numeric-cell">6.0</td>
          <td class="numeric-cell">24</td>
          <td class="numeric-cell">4.0</td>
          <td class="medium-only">I like frozen yogurt</td>
        </tr>
        <tr>
          <td class="checkbox-cell">
            <Checkbox />
          </td>
          <td class="label-cell">Ice cream sandwich</td>
          <td class="numeric-cell">237</td>
          <td class="numeric-cell">9.0</td>
          <td class="numeric-cell">37</td>
          <td class="numeric-cell">4.4</td>
          <td class="medium-only">But like ice cream more</td>
        </tr>
        <tr>
          <td class="checkbox-cell">
            <Checkbox />
          </td>
          <td class="label-cell">Eclair</td>
          <td class="numeric-cell">262</td>
          <td class="numeric-cell">16.0</td>
          <td class="numeric-cell">24</td>
          <td class="numeric-cell">6.0</td>
          <td class="medium-only">Super tasty</td>
        </tr>
        <tr>
          <td class="checkbox-cell">
            <Checkbox />
          </td>
          <td class="label-cell">Cupcake</td>
          <td class="numeric-cell">305</td>
          <td class="numeric-cell">3.7</td>
          <td class="numeric-cell">67</td>
          <td class="numeric-cell">4.3</td>
          <td class="medium-only">Don't like it</td>
        </tr>
      </tbody>
    </table>
  </Card>

  <BlockTitle>With inputs</BlockTitle>
  <BlockHeader
    >Such tables are widely used in admin interfaces for filtering or search data</BlockHeader
  >
  <Card class="data-table">
    <table>
      <thead>
        <tr>
          <th class="input-cell">
            <span class="table-head-label">ID</span>
            <div class="input" style="width: 50px">
              <input type="number" placeholder="Filter" />
            </div>
          </th>
          <th class="input-cell">
            <span class="table-head-label">Name</span>
            <div class="input">
              <input type="text" placeholder="Filter" />
            </div>
          </th>
          <th class="input-cell">
            <span class="table-head-label">Email</span>
            <div class="input">
              <input type="email" placeholder="Filter" />
            </div>
          </th>
          <th class="input-cell">
            <span class="table-head-label">Gender</span>
            <div class="input input-dropdown">
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
  <Card class="data-table data-table-init">
    <CardHeader>
      <div class="data-table-title">Nutrition</div>
      <div class="data-table-actions">
        <Link iconIos="f7:line_horizontal_3_decrease" iconMd="material:sort" />
        <Link iconIos="f7:ellipsis_vertical_circle" iconMd="material:more_vert" />
      </div>
    </CardHeader>
    <CardContent padding={false}>
      <table>
        <thead>
          <tr>
            <th class="checkbox-cell">
              <Checkbox />
            </th>
            <th class="label-cell">Dessert (100g serving)</th>
            <th class="numeric-cell">Calories</th>
            <th class="numeric-cell">Fat (g)</th>
            <th class="numeric-cell">Carbs</th>
            <th class="numeric-cell">Protein (g)</th>
            <th class="medium-only"
              ><Icon ios="f7:chat_bubble_text_fill" md="material:message" /> Comments</th
            >
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Frozen yogurt</td>
            <td class="numeric-cell">159</td>
            <td class="numeric-cell">6.0</td>
            <td class="numeric-cell">24</td>
            <td class="numeric-cell">4.0</td>
            <td class="medium-only">I like frozen yogurt</td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Ice cream sandwich</td>
            <td class="numeric-cell">237</td>
            <td class="numeric-cell">9.0</td>
            <td class="numeric-cell">37</td>
            <td class="numeric-cell">4.4</td>
            <td class="medium-only">But like ice cream more</td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Eclair</td>
            <td class="numeric-cell">262</td>
            <td class="numeric-cell">16.0</td>
            <td class="numeric-cell">24</td>
            <td class="numeric-cell">6.0</td>
            <td class="medium-only">Super tasty</td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Cupcake</td>
            <td class="numeric-cell">305</td>
            <td class="numeric-cell">3.7</td>
            <td class="numeric-cell">67</td>
            <td class="numeric-cell">4.3</td>
            <td class="medium-only">Don't like it</td>
          </tr>
        </tbody>
      </table>
    </CardContent>
  </Card>

  <BlockTitle>Sortable columns</BlockTitle>
  <Card class="data-table data-table-init">
    <CardHeader>
      <div class="data-table-title">Nutrition</div>
      <div class="data-table-actions">
        <Link iconIos="f7:line_horizontal_3_decrease" iconMd="material:sort" />
        <Link iconIos="f7:ellipsis_vertical_circle" iconMd="material:more_vert" />
      </div>
    </CardHeader>
    <CardContent padding={false}>
      <table>
        <thead>
          <tr>
            <th class="checkbox-cell">
              <Checkbox />
            </th>
            <th class="label-cell sortable-cell sortable-cell-active">Dessert (100g serving)</th>
            <th class="numeric-cell sortable-cell">Calories</th>
            <th class="numeric-cell sortable-cell">Fat (g)</th>
            <th class="numeric-cell sortable-cell">Carbs</th>
            <th class="numeric-cell sortable-cell">Protein (g)</th>
            <th class="medium-only"
              ><Icon ios="f7:chat_bubble_text_fill" md="material:message" /> Comments</th
            >
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Frozen yogurt</td>
            <td class="numeric-cell">159</td>
            <td class="numeric-cell">6.0</td>
            <td class="numeric-cell">24</td>
            <td class="numeric-cell">4.0</td>
            <td class="medium-only">I like frozen yogurt</td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Ice cream sandwich</td>
            <td class="numeric-cell">237</td>
            <td class="numeric-cell">9.0</td>
            <td class="numeric-cell">37</td>
            <td class="numeric-cell">4.4</td>
            <td class="medium-only">But like ice cream more</td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Eclair</td>
            <td class="numeric-cell">262</td>
            <td class="numeric-cell">16.0</td>
            <td class="numeric-cell">24</td>
            <td class="numeric-cell">6.0</td>
            <td class="medium-only">Super tasty</td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Cupcake</td>
            <td class="numeric-cell">305</td>
            <td class="numeric-cell">3.7</td>
            <td class="numeric-cell">67</td>
            <td class="numeric-cell">4.3</td>
            <td class="medium-only">Don't like it</td>
          </tr>
        </tbody>
      </table>
    </CardContent>
  </Card>
  <BlockTitle>With title and different actions on select</BlockTitle>
  <Card class="data-table data-table-init">
    <CardHeader>
      <div class="data-table-header">
        <div class="data-table-title">Nutrition</div>
        <div class="data-table-actions">
          <Link iconIos="f7:line_horizontal_3_decrease" iconMd="material:sort" />
          <Link iconIos="f7:ellipsis_vertical_circle" iconMd="material:more_vert" />
        </div>
      </div>
      <div class="data-table-header-selected">
        <div class="data-table-title-selected">
          <span class="data-table-selected-count" /> items selected
        </div>
        <div class="data-table-actions">
          <Link iconIos="f7:trash" iconMd="material:delete" />
          <Link iconIos="f7:ellipsis_vertical_circle" iconMd="material:more_vert" />
        </div>
      </div>
    </CardHeader>
    <CardContent padding={false}>
      <table>
        <thead>
          <tr>
            <th class="checkbox-cell">
              <Checkbox />
            </th>
            <th class="label-cell">Dessert (100g serving)</th>
            <th class="numeric-cell">Calories</th>
            <th class="numeric-cell">Fat (g)</th>
            <th class="numeric-cell">Carbs</th>
            <th class="numeric-cell">Protein (g)</th>
            <th class="medium-only"
              ><Icon ios="f7:chat_bubble_text_fill" md="material:message" /> Comments</th
            >
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Frozen yogurt</td>
            <td class="numeric-cell">159</td>
            <td class="numeric-cell">6.0</td>
            <td class="numeric-cell">24</td>
            <td class="numeric-cell">4.0</td>
            <td class="medium-only">I like frozen yogurt</td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Ice cream sandwich</td>
            <td class="numeric-cell">237</td>
            <td class="numeric-cell">9.0</td>
            <td class="numeric-cell">37</td>
            <td class="numeric-cell">4.4</td>
            <td class="medium-only">But like ice cream more</td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Eclair</td>
            <td class="numeric-cell">262</td>
            <td class="numeric-cell">16.0</td>
            <td class="numeric-cell">24</td>
            <td class="numeric-cell">6.0</td>
            <td class="medium-only">Super tasty</td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Cupcake</td>
            <td class="numeric-cell">305</td>
            <td class="numeric-cell">3.7</td>
            <td class="numeric-cell">67</td>
            <td class="numeric-cell">4.3</td>
            <td class="medium-only">Don't like it</td>
          </tr>
        </tbody>
      </table>
    </CardContent>
  </Card>

  <BlockTitle>Alternate header with actions</BlockTitle>
  <Card class="data-table data-table-init">
    <CardHeader>
      <div class="data-table-links">
        <a class="button">Add</a>
        <a class="button">Remove</a>
      </div>
      <div class="data-table-actions">
        <Link iconIos="f7:line_horizontal_3_decrease" iconMd="material:sort" />
        <Link iconIos="f7:ellipsis_vertical_circle" iconMd="material:more_vert" />
      </div>
    </CardHeader>
    <CardContent padding={false}>
      <table>
        <thead>
          <tr>
            <th class="checkbox-cell">
              <Checkbox />
            </th>
            <th class="label-cell">Dessert (100g serving)</th>
            <th class="numeric-cell">Calories</th>
            <th class="numeric-cell">Fat (g)</th>
            <th class="numeric-cell">Carbs</th>
            <th class="numeric-cell">Protein (g)</th>
            <th class="medium-only"
              ><Icon ios="f7:chat_bubble_text_fill" md="material:message" /> Comments</th
            >
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Frozen yogurt</td>
            <td class="numeric-cell">159</td>
            <td class="numeric-cell">6.0</td>
            <td class="numeric-cell">24</td>
            <td class="numeric-cell">4.0</td>
            <td class="medium-only">I like frozen yogurt</td>
            <td class="actions-cell">
              <Link iconIos="f7:square_pencil" iconMd="material:edit" />
              <Link iconIos="f7:trash" iconMd="material:delete" />
            </td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Ice cream sandwich</td>
            <td class="numeric-cell">237</td>
            <td class="numeric-cell">9.0</td>
            <td class="numeric-cell">37</td>
            <td class="numeric-cell">4.4</td>
            <td class="medium-only">But like ice cream more</td>
            <td class="actions-cell">
              <Link iconIos="f7:square_pencil" iconMd="material:edit" />
              <Link iconIos="f7:trash" iconMd="material:delete" />
            </td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Eclair</td>
            <td class="numeric-cell">262</td>
            <td class="numeric-cell">16.0</td>
            <td class="numeric-cell">24</td>
            <td class="numeric-cell">6.0</td>
            <td class="medium-only">Super tasty</td>
            <td class="actions-cell">
              <Link iconIos="f7:square_pencil" iconMd="material:edit" />
              <Link iconIos="f7:trash" iconMd="material:delete" />
            </td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <Checkbox />
            </td>
            <td class="label-cell">Cupcake</td>
            <td class="numeric-cell">305</td>
            <td class="numeric-cell">3.7</td>
            <td class="numeric-cell">67</td>
            <td class="numeric-cell">4.3</td>
            <td class="medium-only">Don't like it</td>
            <td class="actions-cell">
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
  <Card class="data-table data-table-collapsible data-table-init">
    <CardHeader>
      <div class="data-table-title">Nutrition</div>
      <div class="data-table-actions">
        <Link iconIos="f7:line_horizontal_3_decrease" iconMd="material:sort" />
        <Link iconIos="f7:ellipsis_vertical_circle" iconMd="material:more_vert" />
      </div>
    </CardHeader>
    <CardContent padding={false}>
      <table>
        <thead>
          <tr>
            <th class="label-cell">Dessert (100g serving)</th>
            <th class="numeric-cell">Calories</th>
            <th class="numeric-cell">Fat (g)</th>
            <th class="numeric-cell">Carbs</th>
            <th class="numeric-cell">Protein (g)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label-cell">Frozen yogurt</td>
            <td class="numeric-cell">159</td>
            <td class="numeric-cell">6.0</td>
            <td class="numeric-cell">24</td>
            <td class="numeric-cell">4.0</td>
          </tr>
          <tr>
            <td class="label-cell">Ice cream sandwich</td>
            <td class="numeric-cell">237</td>
            <td class="numeric-cell">9.0</td>
            <td class="numeric-cell">37</td>
            <td class="numeric-cell">4.4</td>
          </tr>
          <tr>
            <td class="label-cell">Eclair</td>
            <td class="numeric-cell">262</td>
            <td class="numeric-cell">16.0</td>
            <td class="numeric-cell">24</td>
            <td class="numeric-cell">6.0</td>
          </tr>
          <tr>
            <td class="label-cell">Cupcake</td>
            <td class="numeric-cell">305</td>
            <td class="numeric-cell">3.7</td>
            <td class="numeric-cell">67</td>
            <td class="numeric-cell">4.3</td>
          </tr>
        </tbody>
      </table>
    </CardContent>
  </Card>
</Page>
