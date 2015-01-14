<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/rss">
	<html>
	<head>
		<link href="xls.css" rel="stylesheet" type="text/css" />
		<style type="text/css">
			body {
				font-size:0.83em;
			}
		</style>
	</head>
	<body>
		<div class="Snippet" style="border-width:0; background-color:#FFF; margin:1em">
			<dl style="padding-right:1em">
				<xsl:for-each select="channel/item">
                <table>
                	<tr>
                    	<td>
                        	<xsl:element name="img">
								<xsl:value-of select="image"/>
							</xsl:element>
                        </td>
                    </tr>
             	</table>
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
				</xsl:for-each>
			</dl>
		</div>
	</body>
	</html>
</xsl:template>
</xsl:stylesheet>