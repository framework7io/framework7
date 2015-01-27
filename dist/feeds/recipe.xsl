<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/rss">
	<html>
	<head>
		<style type="text/css">
			body {
				font-size:0.83em;
			}
			.entry {
				background: #fff;
				width: 100%;
				main-height: 125px;
				height: auto;
				padding: 5px 10px 5px 5px;
				margin: 5px 0 5px 2px;
			}
		</style>
	</head>
	<body>
		<div>
			<dl>
				<xsl:for-each select="channel/item">
                <table class="entry">
                	<tr>
                    	<td>
                        	<xsl:element name="img">
								<xsl:value-of select="image"/>
							</xsl:element>
                        </td>
                        
                        <td>
                        	<table>
                            	<tr>
                                	<td>
                                        <xsl:element name="a">
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="link"/>
                                            </xsl:attribute>
                                            <xsl:value-of select="title"/>
                                        </xsl:element>
                                  	</td>
                             	</tr>
                                
                                <tr>
                                	<td>
                        				<xsl:value-of select="description" /><br />
                        			</td>
                                </tr>
                          	</table>
                       	</td>
                    </tr>
             	</table>
				</xsl:for-each>
			</dl>
		</div>
	</body>
	</html>
</xsl:template>
</xsl:stylesheet>