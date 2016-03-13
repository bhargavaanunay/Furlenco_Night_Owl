class ObjConverter(object):
    """Dictonary to Object Converter"""

    def __init__(self, d):
        for key,val in d.items():
            if isinstance(val, (list, tuple)):
               setattr(self, key, [ObjConverter(x) if isinstance(x, dict) else x for x in val])
            else:
               setattr(self, key, ObjConverter(val) if isinstance(val, dict) else val)
              