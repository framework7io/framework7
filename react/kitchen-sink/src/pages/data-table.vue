<template>
  <Page>
    <Navbar title="Data Table" backLink="Back"></Navbar>
    <BlockTitle>Plain table</BlockTitle>
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th className="label-cell">Desert (100g serving)</th>
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
    <div className="card data-table">
      <table>
        <thead>
          <tr>
            <th className="label-cell">Desert (100g serving)</th>
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
    <BlockTitle>Selectable rows</BlockTitle>
    <div className="data-table data-table-init card">
      <table>
        <thead>
          <tr>
            <th className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
            </th>
            <th className="label-cell">Desert (100g serving)</th>
            <th className="numeric-cell">Calories</th>
            <th className="numeric-cell">Fat (g)</th>
            <th className="numeric-cell">Carbs</th>
            <th className="numeric-cell">Protein (g)</th>
            <th className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
              <span>In Stock</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
            </td>
            <td className="label-cell">Frozen yogurt</td>
            <td className="numeric-cell">159</td>
            <td className="numeric-cell">6.0</td>
            <td className="numeric-cell">24</td>
            <td className="numeric-cell">4.0</td>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
            </td>
          </tr>
          <tr>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
            </td>
            <td className="label-cell">Ice cream sandwich</td>
            <td className="numeric-cell">237</td>
            <td className="numeric-cell">9.0</td>
            <td className="numeric-cell">37</td>
            <td className="numeric-cell">4.4</td>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
            </td>
          </tr>
          <tr>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
            </td>
            <td className="label-cell">Eclair</td>
            <td className="numeric-cell">262</td>
            <td className="numeric-cell">16.0</td>
            <td className="numeric-cell">24</td>
            <td className="numeric-cell">6.0</td>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
            </td>
          </tr>
          <tr>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
            </td>
            <td className="label-cell">Cupcake</td>
            <td className="numeric-cell">305</td>
            <td className="numeric-cell">3.7</td>
            <td className="numeric-cell">67</td>
            <td className="numeric-cell">4.3</td>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <BlockTitle>Tablet-only columns</BlockTitle>
    <div className="block-header">
      <p>"Comments" column will be visible only on large screen devices (tablets)</p>
    </div>
    <div className="data-table data-table-init card">
      <table>
        <thead>
          <tr>
            <th className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
            </th>
            <th className="label-cell">Desert (100g serving)</th>
            <th className="numeric-cell">Calories</th>
            <th className="numeric-cell">Fat (g)</th>
            <th className="numeric-cell">Carbs</th>
            <th className="numeric-cell">Protein (g)</th>
            <th className="tablet-only"><Icon if-ios="f7:chat_fill" if-md="material:message"></Icon> Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
            </td>
            <td className="label-cell">Frozen yogurt</td>
            <td className="numeric-cell">159</td>
            <td className="numeric-cell">6.0</td>
            <td className="numeric-cell">24</td>
            <td className="numeric-cell">4.0</td>
            <td className="tablet-only">I like frozen yogurt</td>
          </tr>
          <tr>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
            </td>
            <td className="label-cell">Ice cream sandwich</td>
            <td className="numeric-cell">237</td>
            <td className="numeric-cell">9.0</td>
            <td className="numeric-cell">37</td>
            <td className="numeric-cell">4.4</td>
            <td className="tablet-only">But like ice cream more</td>
          </tr>
          <tr>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
            </td>
            <td className="label-cell">Eclair</td>
            <td className="numeric-cell">262</td>
            <td className="numeric-cell">16.0</td>
            <td className="numeric-cell">24</td>
            <td className="numeric-cell">6.0</td>
            <td className="tablet-only">Super tasty</td>
          </tr>
          <tr>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <i className="icon-checkbox"></i>
              </label>
            </td>
            <td className="label-cell">Cupcake</td>
            <td className="numeric-cell">305</td>
            <td className="numeric-cell">3.7</td>
            <td className="numeric-cell">67</td>
            <td className="numeric-cell">4.3</td>
            <td className="tablet-only">Don't like it</td>
          </tr>
        </tbody>
      </table>
    </div>
    <BlockTitle>With inputs</BlockTitle>
    <div className="block-header">Such tables are widely used in admin interfaces for filtering or search data</div>
    <div className="card data-table">
      <table>
        <thead>
          <tr>
            <th className="input-cell">
              <span className="table-head-label">ID</span>
              <div className="input" style="width: 50px">
                <input type="number" placeholder="Filter">
              </div>
            </th>
            <th className="input-cell">
              <span className="table-head-label">Name</span>
              <div className="input">
                <input type="text" placeholder="Filter">
              </div>
            </th>
            <th className="input-cell">
              <span className="table-head-label">Email</span>
              <div className="input">
                <input type="email" placeholder="Filter">
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
    </div>
    <BlockTitle>Within card with title and actions</BlockTitle>
    <div className="data-table data-table-init card">
      <div className="card-header">
        <div className="data-table-title">Nutrition</div>
        <div className="data-table-actions">
          <Link icon-if-ios="f7:sort" icon-if-md="material:sort"></Link>
          <Link icon-if-ios="f7:more_vertical_round" icon-if-md="material:more_vert"></Link>
        </div>
      </div>
      <div className="card-content">
        <table>
          <thead>
            <tr>
              <th className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </th>
              <th className="label-cell">Desert (100g serving)</th>
              <th className="numeric-cell">Calories</th>
              <th className="numeric-cell">Fat (g)</th>
              <th className="numeric-cell">Carbs</th>
              <th className="numeric-cell">Protein (g)</th>
              <th className="tablet-only"><Icon if-ios="f7:chat_fill" if-md="material:message"></Icon> Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Frozen yogurt</td>
              <td className="numeric-cell">159</td>
              <td className="numeric-cell">6.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">4.0</td>
              <td className="tablet-only">I like frozen yogurt</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Ice cream sandwich</td>
              <td className="numeric-cell">237</td>
              <td className="numeric-cell">9.0</td>
              <td className="numeric-cell">37</td>
              <td className="numeric-cell">4.4</td>
              <td className="tablet-only">But like ice cream more</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Eclair</td>
              <td className="numeric-cell">262</td>
              <td className="numeric-cell">16.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">6.0</td>
              <td className="tablet-only">Super tasty</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Cupcake</td>
              <td className="numeric-cell">305</td>
              <td className="numeric-cell">3.7</td>
              <td className="numeric-cell">67</td>
              <td className="numeric-cell">4.3</td>
              <td className="tablet-only">Don't like it</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <BlockTitle>Sortable columns</BlockTitle>
    <div className="data-table data-table-init card">
      <div className="card-header">
        <div className="data-table-title">Nutrition</div>
        <div className="data-table-actions">
          <Link icon-if-ios="f7:sort" icon-if-md="material:sort"></Link>
          <Link icon-if-ios="f7:more_vertical_round" icon-if-md="material:more_vert"></Link>
        </div>
      </div>
      <div className="card-content">
        <table>
          <thead>
            <tr>
              <th className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </th>
              <th className="label-cell sortable-cell sortable-cell-active">Desert (100g serving)</th>
              <th className="numeric-cell sortable-cell">Calories</th>
              <th className="numeric-cell sortable-cell">Fat (g)</th>
              <th className="numeric-cell sortable-cell">Carbs</th>
              <th className="numeric-cell sortable-cell">Protein (g)</th>
              <th className="tablet-only"><Icon if-ios="f7:chat_fill" if-md="material:message"></Icon> Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Frozen yogurt</td>
              <td className="numeric-cell">159</td>
              <td className="numeric-cell">6.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">4.0</td>
              <td className="tablet-only">I like frozen yogurt</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Ice cream sandwich</td>
              <td className="numeric-cell">237</td>
              <td className="numeric-cell">9.0</td>
              <td className="numeric-cell">37</td>
              <td className="numeric-cell">4.4</td>
              <td className="tablet-only">But like ice cream more</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Eclair</td>
              <td className="numeric-cell">262</td>
              <td className="numeric-cell">16.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">6.0</td>
              <td className="tablet-only">Super tasty</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Cupcake</td>
              <td className="numeric-cell">305</td>
              <td className="numeric-cell">3.7</td>
              <td className="numeric-cell">67</td>
              <td className="numeric-cell">4.3</td>
              <td className="tablet-only">Don't like it</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <BlockTitle>With title and different actions on select</BlockTitle>
    <div className="data-table data-table-init card">
      <div className="card-header">
        <div className="data-table-header">
          <div className="data-table-title">Nutrition</div>
          <div className="data-table-actions">
            <Link icon-if-ios="f7:sort" icon-if-md="material:sort"></Link>
            <Link icon-if-ios="f7:more_vertical_round" icon-if-md="material:more_vert"></Link>
          </div>
        </div>
        <div className="data-table-header-selected">
          <div className="data-table-title-selected"><span className="data-table-selected-count"></span> items selected</div>
          <div className="data-table-actions">
            <Link icon-if-ios="f7:trash" icon-if-md="material:delete"></Link>
            <Link icon-if-ios="f7:more_vertical_round" icon-if-md="material:more_vert"></Link>
          </div>
        </div>
      </div>
      <div className="card-content">
        <table>
          <thead>
            <tr>
              <th className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </th>
              <th className="label-cell">Desert (100g serving)</th>
              <th className="numeric-cell">Calories</th>
              <th className="numeric-cell">Fat (g)</th>
              <th className="numeric-cell">Carbs</th>
              <th className="numeric-cell">Protein (g)</th>
              <th className="tablet-only"><Icon if-ios="f7:chat_fill" if-md="material:message"></Icon> Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Frozen yogurt</td>
              <td className="numeric-cell">159</td>
              <td className="numeric-cell">6.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">4.0</td>
              <td className="tablet-only">I like frozen yogurt</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Ice cream sandwich</td>
              <td className="numeric-cell">237</td>
              <td className="numeric-cell">9.0</td>
              <td className="numeric-cell">37</td>
              <td className="numeric-cell">4.4</td>
              <td className="tablet-only">But like ice cream more</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Eclair</td>
              <td className="numeric-cell">262</td>
              <td className="numeric-cell">16.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">6.0</td>
              <td className="tablet-only">Super tasty</td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Cupcake</td>
              <td className="numeric-cell">305</td>
              <td className="numeric-cell">3.7</td>
              <td className="numeric-cell">67</td>
              <td className="numeric-cell">4.3</td>
              <td className="tablet-only">Don't like it</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <BlockTitle>Alternate header with actions</BlockTitle>
    <div className="data-table data-table-init card">
      <div className="card-header">
        <div className="data-table-links"><a className="link">Add</a><a className="link">Remove</a></div>
        <div className="data-table-actions">
          <Link icon-if-ios="f7:sort" icon-if-md="material:sort"></Link>
          <Link icon-if-ios="f7:more_vertical_round" icon-if-md="material:more_vert"></Link>
        </div>
      </div>
      <div className="card-content">
        <table>
          <thead>
            <tr>
              <th className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </th>
              <th className="label-cell">Desert (100g serving)</th>
              <th className="numeric-cell">Calories</th>
              <th className="numeric-cell">Fat (g)</th>
              <th className="numeric-cell">Carbs</th>
              <th className="numeric-cell">Protein (g)</th>
              <th className="tablet-only"><Icon if-ios="f7:chat_fill" if-md="material:message"></Icon> Comments</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Frozen yogurt</td>
              <td className="numeric-cell">159</td>
              <td className="numeric-cell">6.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">4.0</td>
              <td className="tablet-only">I like frozen yogurt</td>
              <td className="actions-cell">
                <Link icon-if-ios="f7:compose" icon-if-md="material:edit"></Link>
                <Link icon-if-ios="f7:trash" icon-if-md="material:delete"></Link>
              </td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Ice cream sandwich</td>
              <td className="numeric-cell">237</td>
              <td className="numeric-cell">9.0</td>
              <td className="numeric-cell">37</td>
              <td className="numeric-cell">4.4</td>
              <td className="tablet-only">But like ice cream more</td>
              <td className="actions-cell">
                <Link icon-if-ios="f7:compose" icon-if-md="material:edit"></Link>
                <Link icon-if-ios="f7:trash" icon-if-md="material:delete"></Link>
              </td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Eclair</td>
              <td className="numeric-cell">262</td>
              <td className="numeric-cell">16.0</td>
              <td className="numeric-cell">24</td>
              <td className="numeric-cell">6.0</td>
              <td className="tablet-only">Super tasty</td>
              <td className="actions-cell">
                <Link icon-if-ios="f7:compose" icon-if-md="material:edit"></Link>
                <Link icon-if-ios="f7:trash" icon-if-md="material:delete"></Link>
              </td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <i className="icon-checkbox"></i>
                </label>
              </td>
              <td className="label-cell">Cupcake</td>
              <td className="numeric-cell">305</td>
              <td className="numeric-cell">3.7</td>
              <td className="numeric-cell">67</td>
              <td className="numeric-cell">4.3</td>
              <td className="tablet-only">Don't like it</td>
              <td className="actions-cell">
                <Link icon-if-ios="f7:compose" icon-if-md="material:edit"></Link>
                <Link icon-if-ios="f7:trash" icon-if-md="material:delete"></Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <BlockTitle>Collapsible</BlockTitle>
    <div className="block-header">
      <p>The following table will be collapsed to kind of List View on small screens:</p>
    </div>
    <div className="card data-table data-table-collapsible data-table-init">
      <div className="card-header">
        <div className="data-table-title">Nutrition</div>
        <div className="data-table-actions">
          <Link icon-if-ios="f7:sort" icon-if-md="material:sort"></Link>
          <Link icon-if-ios="f7:more_vertical_round" icon-if-md="material:more_vert"></Link>
        </div>
      </div>
      <div className="card-content">
        <table>
          <thead>
            <tr>
              <th className="label-cell">Desert (100g serving)</th>
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
    </div>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, BlockTitle, Link, Icon } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
      BlockTitle,
      Link,
      Icon,
    },
  };
</script>
