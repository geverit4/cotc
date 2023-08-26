from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in cotc/__init__.py
from cotc import __version__ as version

setup(
	name="cotc",
	version=version,
	description="A light-hearted \"cult\" of vegans and whole plant enthusiasts. ",
	author="Geordie Everitt",
	author_email="geordie504@pm.me",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
