from json import JSONEncoder

class DecimalSerializer(JSONEncoder):

    def _iterencode(self, o, markers=None):
        if isinstance(o, decimal.Decimal):
            return float(o)
        return super(DecimalSerializer, self).default(o)