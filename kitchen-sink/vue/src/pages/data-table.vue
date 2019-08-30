<template>
  <f7-page>
    <f7-navbar title="Data Table" back-link="Back"></f7-navbar>
    <f7-block-title>Plain table</f7-block-title>
    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th class="label-cell">Desert (100g serving)</th>
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
    <f7-block-title>Within card</f7-block-title>
    <div class="card data-table">
      <table>
        <thead>
          <tr>
            <th class="label-cell">Desert (100g serving)</th>
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
    <f7-block-title>Selectable rows</f7-block-title>
    <div class="data-table data-table-init card">
      <table>
        <thead>
          <tr>
            <th class="checkbox-cell">
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
            </th>
            <th class="label-cell">Desert (100g serving)</th>
            <th class="numeric-cell">Calories</th>
            <th class="numeric-cell">Fat (g)</th>
            <th class="numeric-cell">Carbs</th>
            <th class="numeric-cell">Protein (g)</th>
            <th class="checkbox-cell">
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
              <span>In Stock</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="checkbox-cell">
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
            </td>
            <td class="label-cell">Frozen yogurt</td>
            <td class="numeric-cell">159</td>
            <td class="numeric-cell">6.0</td>
            <td class="numeric-cell">24</td>
            <td class="numeric-cell">4.0</td>
            <td class="checkbox-cell">
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
            </td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
            </td>
            <td class="label-cell">Ice cream sandwich</td>
            <td class="numeric-cell">237</td>
            <td class="numeric-cell">9.0</td>
            <td class="numeric-cell">37</td>
            <td class="numeric-cell">4.4</td>
            <td class="checkbox-cell">
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
            </td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
            </td>
            <td class="label-cell">Eclair</td>
            <td class="numeric-cell">262</td>
            <td class="numeric-cell">16.0</td>
            <td class="numeric-cell">24</td>
            <td class="numeric-cell">6.0</td>
            <td class="checkbox-cell">
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
            </td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
            </td>
            <td class="label-cell">Cupcake</td>
            <td class="numeric-cell">305</td>
            <td class="numeric-cell">3.7</td>
            <td class="numeric-cell">67</td>
            <td class="numeric-cell">4.3</td>
            <td class="checkbox-cell">
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <f7-block-title>Tablet-only columns</f7-block-title>
    <div class="block-header">
      <p>"Comments" column will be visible only on devices with screen width >= 768px (tablets)</p>
    </div>
    <div class="data-table data-table-init card">
      <table>
        <thead>
          <tr>
            <th class="checkbox-cell">
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
            </th>
            <th class="label-cell">Desert (100g serving)</th>
            <th class="numeric-cell">Calories</th>
            <th class="numeric-cell">Fat (g)</th>
            <th class="numeric-cell">Carbs</th>
            <th class="numeric-cell">Protein (g)</th>
            <th class="medium-only"><f7-icon ios="f7:chat_bubble_text_fill" aurora="f7:chat_bubble_text_fill" md="material:message"></f7-icon> Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="checkbox-cell">
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
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
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
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
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
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
              <label class="checkbox">
                <input type="checkbox"/>
                <i class="icon-checkbox"></i>
              </label>
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
    </div>
    <f7-block-title>With inputs</f7-block-title>
    <div class="block-header">Such tables are widely used in admin interfaces for filtering or search data</div>
    <div class="card data-table">
      <table>
        <thead>
          <tr>
            <th class="input-cell">
              <span class="table-head-label">ID</span>
              <div class="input" style="width: 50px">
                <input type="number" placeholder="Filter">
              </div>
            </th>
            <th class="input-cell">
              <span class="table-head-label">Name</span>
              <div class="input">
                <input type="text" placeholder="Filter">
              </div>
            </th>
            <th class="input-cell">
              <span class="table-head-label">Email</span>
              <div class="input">
                <input type="email" placeholder="Filter">
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
    </div>
    <f7-block-title>Within card with title and actions</f7-block-title>
    <div class="data-table data-table-init card">
      <div class="card-header">
        <div class="data-table-title">Nutrition</div>
        <div class="data-table-actions">
          <f7-link icon-ios="f7:line_horizontal_3_decrease" icon-aurora="f7:line_horizontal_3_decrease" icon-md="material:sort"></f7-link>
          <f7-link icon-ios="f7:ellipsis_vertical_circle" icon-aurora="f7:ellipsis_vertical_circle" icon-md="material:more_vert"></f7-link>
        </div>
      </div>
      <div class="card-content">
        <table>
          <thead>
            <tr>
              <th class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
              </th>
              <th class="label-cell">Desert (100g serving)</th>
              <th class="numeric-cell">Calories</th>
              <th class="numeric-cell">Fat (g)</th>
              <th class="numeric-cell">Carbs</th>
              <th class="numeric-cell">Protein (g)</th>
              <th class="medium-only"><f7-icon ios="f7:chat_bubble_text_fill" aurora="f7:chat_bubble_text_fill" md="material:message"></f7-icon> Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
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
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
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
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
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
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
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
      </div>
    </div>
    <f7-block-title>Sortable columns</f7-block-title>
    <div class="data-table data-table-init card">
      <div class="card-header">
        <div class="data-table-title">Nutrition</div>
        <div class="data-table-actions">
          <f7-link icon-ios="f7:line_horizontal_3_decrease" icon-aurora="f7:line_horizontal_3_decrease" icon-md="material:sort"></f7-link>
          <f7-link icon-ios="f7:ellipsis_vertical_circle" icon-aurora="f7:ellipsis_vertical_circle" icon-md="material:more_vert"></f7-link>
        </div>
      </div>
      <div class="card-content">
        <table>
          <thead>
            <tr>
              <th class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
              </th>
              <th class="label-cell sortable-cell sortable-cell-active">Desert (100g serving)</th>
              <th class="numeric-cell sortable-cell">Calories</th>
              <th class="numeric-cell sortable-cell">Fat (g)</th>
              <th class="numeric-cell sortable-cell">Carbs</th>
              <th class="numeric-cell sortable-cell">Protein (g)</th>
              <th class="medium-only"><f7-icon ios="f7:chat_bubble_text_fill" aurora="f7:chat_bubble_text_fill" md="material:message"></f7-icon> Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
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
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
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
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
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
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
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
      </div>
    </div>
    <f7-block-title>With title and different actions on select</f7-block-title>
    <div class="data-table data-table-init card">
      <div class="card-header">
        <div class="data-table-header">
          <div class="data-table-title">Nutrition</div>
          <div class="data-table-actions">
            <f7-link icon-ios="f7:line_horizontal_3_decrease" icon-aurora="f7:line_horizontal_3_decrease" icon-md="material:sort"></f7-link>
            <f7-link icon-ios="f7:ellipsis_vertical_circle" icon-aurora="f7:ellipsis_vertical_circle" icon-md="material:more_vert"></f7-link>
          </div>
        </div>
        <div class="data-table-header-selected">
          <div class="data-table-title-selected"><span class="data-table-selected-count"></span> items selected</div>
          <div class="data-table-actions">
            <f7-link icon-ios="f7:trash" icon-aurora="f7:trash" icon-md="material:delete"></f7-link>
            <f7-link icon-ios="f7:ellipsis_vertical_circle" icon-aurora="f7:ellipsis_vertical_circle" icon-md="material:more_vert"></f7-link>
          </div>
        </div>
      </div>
      <div class="card-content">
        <table>
          <thead>
            <tr>
              <th class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
              </th>
              <th class="label-cell">Desert (100g serving)</th>
              <th class="numeric-cell">Calories</th>
              <th class="numeric-cell">Fat (g)</th>
              <th class="numeric-cell">Carbs</th>
              <th class="numeric-cell">Protein (g)</th>
              <th class="medium-only"><f7-icon ios="f7:chat_bubble_text_fill" aurora="f7:chat_bubble_text_fill" md="material:message"></f7-icon> Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
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
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
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
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
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
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
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
      </div>
    </div>
    <f7-block-title>Alternate header with actions</f7-block-title>
    <div class="data-table data-table-init card">
      <div class="card-header">
        <div class="data-table-links"><a class="button">Add</a><a class="button">Remove</a></div>
        <div class="data-table-actions">
          <f7-link icon-ios="f7:line_horizontal_3_decrease" icon-aurora="f7:line_horizontal_3_decrease" icon-md="material:sort"></f7-link>
          <f7-link icon-ios="f7:ellipsis_vertical_circle" icon-aurora="f7:ellipsis_vertical_circle" icon-md="material:more_vert"></f7-link>
        </div>
      </div>
      <div class="card-content">
        <table>
          <thead>
            <tr>
              <th class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
              </th>
              <th class="label-cell">Desert (100g serving)</th>
              <th class="numeric-cell">Calories</th>
              <th class="numeric-cell">Fat (g)</th>
              <th class="numeric-cell">Carbs</th>
              <th class="numeric-cell">Protein (g)</th>
              <th class="medium-only"><f7-icon ios="f7:chat_bubble_text_fill" aurora="f7:chat_bubble_text_fill" md="material:message"></f7-icon> Comments</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
              </td>
              <td class="label-cell">Frozen yogurt</td>
              <td class="numeric-cell">159</td>
              <td class="numeric-cell">6.0</td>
              <td class="numeric-cell">24</td>
              <td class="numeric-cell">4.0</td>
              <td class="medium-only">I like frozen yogurt</td>
              <td class="actions-cell">
                <f7-link icon-ios="f7:square_pencil" icon-aurora="f7:square_pencil" icon-md="material:edit"></f7-link>
                <f7-link icon-ios="f7:trash" icon-aurora="f7:trash" icon-md="material:delete"></f7-link>
              </td>
            </tr>
            <tr>
              <td class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
              </td>
              <td class="label-cell">Ice cream sandwich</td>
              <td class="numeric-cell">237</td>
              <td class="numeric-cell">9.0</td>
              <td class="numeric-cell">37</td>
              <td class="numeric-cell">4.4</td>
              <td class="medium-only">But like ice cream more</td>
              <td class="actions-cell">
                <f7-link icon-ios="f7:square_pencil" icon-aurora="f7:square_pencil" icon-md="material:edit"></f7-link>
                <f7-link icon-ios="f7:trash" icon-aurora="f7:trash" icon-md="material:delete"></f7-link>
              </td>
            </tr>
            <tr>
              <td class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
              </td>
              <td class="label-cell">Eclair</td>
              <td class="numeric-cell">262</td>
              <td class="numeric-cell">16.0</td>
              <td class="numeric-cell">24</td>
              <td class="numeric-cell">6.0</td>
              <td class="medium-only">Super tasty</td>
              <td class="actions-cell">
                <f7-link icon-ios="f7:square_pencil" icon-aurora="f7:square_pencil" icon-md="material:edit"></f7-link>
                <f7-link icon-ios="f7:trash" icon-aurora="f7:trash" icon-md="material:delete"></f7-link>
              </td>
            </tr>
            <tr>
              <td class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox"/>
                  <i class="icon-checkbox"></i>
                </label>
              </td>
              <td class="label-cell">Cupcake</td>
              <td class="numeric-cell">305</td>
              <td class="numeric-cell">3.7</td>
              <td class="numeric-cell">67</td>
              <td class="numeric-cell">4.3</td>
              <td class="medium-only">Don't like it</td>
              <td class="actions-cell">
                <f7-link icon-ios="f7:square_pencil" icon-aurora="f7:square_pencil" icon-md="material:edit"></f7-link>
                <f7-link icon-ios="f7:trash" icon-aurora="f7:trash" icon-md="material:delete"></f7-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <f7-block-title>Collapsible</f7-block-title>
    <div class="block-header">
      <p>The following table will be collapsed to kind of List View on small screens:</p>
    </div>
    <div class="card data-table data-table-collapsible data-table-init">
      <div class="card-header">
        <div class="data-table-title">Nutrition</div>
        <div class="data-table-actions">
          <f7-link icon-ios="f7:line_horizontal_3_decrease" icon-aurora="f7:line_horizontal_3_decrease" icon-md="material:sort"></f7-link>
          <f7-link icon-ios="f7:ellipsis_vertical_circle" icon-aurora="f7:ellipsis_vertical_circle" icon-md="material:more_vert"></f7-link>
        </div>
      </div>
      <div class="card-content">
        <table>
          <thead>
            <tr>
              <th class="label-cell">Desert (100g serving)</th>
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
    </div>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7Link, f7Icon } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
      f7Link,
      f7Icon,
    },
  };
</script>
