<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/rss">
    <html>
    <head>
        <link href="daily.css" rel="stylesheet" type="text/css" />
        <style type="text/css">
            body {
                font-size:0.83em;
            }
        </style>
    </head>
    <body>
        <div id="logo">
            <xsl:element name="a">
                <xsl:attribute name="href">
                    <xsl:value-of select="channel/link" />
                </xsl:attribute>
                <xsl:value-of select="channel/title" />
            </xsl:element>
        </div>
        <div class="Snippet" style="border-width:0; background-color:#FFF; margin:1em">
            <div class="titleWithLine">
                <xsl:value-of select="channel/description" />
            </div>
            <dl style="padding-right:1em">
                <xsl:for-each select="channel/item">
                    <dd>
                        <xsl:element name="a">
                            <xsl:attribute name="href">
                                <xsl:value-of select="link"/>
                            </xsl:attribute>
                            <xsl:value-of select="title"/>
                        </xsl:element>
                    </dd>
                    <dt>
                        <xsl:value-of select="description" /><br />
                        <span class="comments"><xsl:value-of select="pubDate" /></span>
                    </dt>
                </xsl:for-each>
            </dl>
        </div>
        <div id="footer">
            <xsl:value-of select="channel/copyright" />
        </div>
    </body>
    </html>
</xsl:template>
</xsl:stylesheet>