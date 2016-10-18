import os;
class pathSecurity:
	@staticmethod
	def preventTraversal(path):
		secPath = os.path.normpath("/" + path).lstrip('/')
		if (secPath.startswith("\\")):
			secPath = secPath[1:]
		return secPath